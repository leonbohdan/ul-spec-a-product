# Registration & Login

## Summary
Registration & Login lets people prove who they are so they can take part in the platform. Customers sign in with one click through their Google or GitHub account, with no password to create. Internal team members sign in with their company email and password to reach staff-only capabilities. A single verified identity is shared across everything a signed-in person does: submitting ideas, voting and commenting.

## Goals
- Let customers browse the public board freely and verify themselves only when they act (submit an idea, vote or comment).
- Make customer verification take one click, with no passwords or manual name entry.
- Capture each customer's verified name and email automatically, so the team can follow up and send progress updates.
- Make sure real, verified identities back ideas, votes and comments, to limit spam and bot activity.
- Give internal team members a separate, secure sign-in that unlocks staff privileges.
- Keep the user clearly informed of their sign-in state.

## Requirements

### Customer sign-in (social)
1. The system must let a customer sign in with Google, GitHub or Apple.
2. When a customer signs in with a social provider, the system must retrieve their verified name and email from that provider automatically. It must not ask for them manually, and social sign-in must not require a password.
3. The system must let visitors browse the public board and idea detail pages without signing in.
4. The system must require sign-in before a visitor can submit an idea, upvote an idea or post a comment.
5. A visitor must be able to start sign-in in either of two ways:
   - explicitly, by clicking "Sign In"
   - implicitly, by attempting a gated action (submit an idea, vote or comment)
6. When sign-in is triggered by a gated action, the visitor must be able to complete verification without losing the context of what they were doing.
7. A customer's verified session must be shared across all gated actions (ideas, votes, comments). They must not have to re-verify for each one.
8. The customer's email must be kept private. It must never appear on the public board, and only authorized internal team members may see it.

### Team member sign-in (company credentials)
9. The system must provide a dedicated team login with company email and password fields.
10. The system must let internal team members authenticate with those credentials and gain staff privileges: internal dashboard access, internal notes, and staff-badged public replies.
11. Team member authentication must be kept separate from the customer social sign-in experience.
12. Team members must be able to use all customer capabilities once signed in.

### Authentication interface
13. The system must present an authentication modal offering prominent "Continue with Google", "Continue with GitHub" and "Continue with Apple" options, plus an email and password option for customers (sign-up and sign-in).
14. The system must present a separate team login form with email and password fields.
15. When a user is signed in, the system must show a status indicator with their verified avatar, name and a sign-out option.
16. When no one is signed in, the system must show a "Sign in" entry point in the header.

### Edge cases and constraints
17. If social verification fails or is cancelled, the system must tell the user and leave them unauthenticated. They must keep access to public, read-only content.
18. If a team member enters invalid credentials, the system must show a clear error and must not grant access.
19. A customer must not gain staff privileges through social sign-in.

### Additional customer sign-up and protection
20. Customers must be able to register and sign in with an email and password as an alternative to social sign-in.
21. The system must apply rate limiting to sign-in and sign-up attempts.
22. The system must temporarily lock an account (or block the source) after repeated failed sign-in attempts, and tell the user when this has happened.
23. The system must apply a CAPTCHA challenge on sign-up and sign-in forms to block automated abuse.

### Team access and roles
24. The system must support staff tiers: **super-admin** and **moderator**. Both are staff and have all staff capabilities (internal dashboard, internal notes, staff-badged replies). Only a super-admin can manage roles and approve staff access.
25. A person without staff access must be able to submit a staff access request (self-service sign-up as a requester) instead of being provisioned manually.
26. Super-admins must be able to review access requests and approve (choosing the tier) or reject them. A requester must have no staff privileges until approved, and must be told of the outcome.
27. Super-admins must be able to view registered users and promote a user to a staff tier, change a staff user's tier, or remove staff status, from Account settings.
28. A super-admin must not be able to remove their own super-admin status, and the last remaining super-admin must not be demotable.
29. The very first super-admin must be created through a one-off bootstrap (script and environment variables), because nobody exists yet to approve requests.
30. Every role change and access-request decision must be recorded in an audit log showing who did it, who it affected, the old and new role, and when. Super-admins must be able to view the log.

### Account self-management
31. A signed-in user must be able to edit their profile (display name).
32. A signed-in user must be able to upload and change their avatar.
33. A signed-in user must be able to delete their own account, after a confirmation step. Their ideas, votes and comments must follow a clearly defined rule (for example, content stays but is shown as anonymous) so the board stays consistent.
34. Form input (sign-in, sign-up, profile, access request) must be validated with clear inline error messages.

### Out of scope (covered by other features)
- Forgotten-password recovery: Account Management.
- Sign-out behavior and clearing session state: Account Management.
- How gated actions behave once the user is verified: Idea Submission, Voting, Comments.

## Technical


Principle: use Supabase Auth built-in functionality wherever possible and avoid custom auth code.

### Authentication (built-in)
- Use Supabase Auth as the single provider for customers and team members.
- Integrate through the `@nuxtjs/supabase` module: `useSupabaseClient` and `useSupabaseUser` on the client, `serverSupabaseUser` and `serverSupabaseServiceRole` on the server. The module handles the session cookie and token refresh.
- Customer social sign-in: the built-in Google, GitHub and Apple OAuth providers via `signInWithOAuth` (PKCE flow). Name, email and avatar come from the provider profile (`user_metadata`). Enable and configure each provider in the Supabase dashboard (Apple needs an Apple Developer service ID and key).
- Customer email and password: the built-in `signUp` and `signInWithPassword`, with Supabase's built-in email confirmation. Customers get the `customer` role.
- Team sign-in: the built-in email and password method via `signInWithPassword`, on a separate login form.
- Allow-list the app's callback URLs in the Supabase dashboard (Redirect URLs). Handle the OAuth callback and its error and cancel cases with the module's redirect options.
- Account linking: use Supabase's built-in automatic linking of identities that share a verified email, so one person has one account.

### Roles and tiers
- Store the tier in `app_metadata.role` with values `customer`, `moderator` or `super_admin`. Only the service role can write `app_metadata`, so users can't promote themselves. Social and customer sign-up never set a staff tier.
- Enforce roles in row-level security with the built-in JWT claim (`auth.jwt() -> 'app_metadata' ->> 'role'`). Server routes check the same value through `serverSupabaseUser`. Only `super_admin` may call role-management routes.
- Customer email stays in Supabase Auth and is exposed only to staff through RLS-protected reads or server routes. It is never exposed in public API responses.

### Staff access requests
- Create an `access_requests` table (user id, message, status, decided by, decided at). A signed-in user may insert and read only their own request (RLS). Super-admins read and update all.
- Approving a request calls the Admin API `auth.admin.updateUserById` to set the tier. Requesters get an email notice through Supabase's built-in email sending.

### First super-admin bootstrap
- Provide a one-off script, `scripts/seed-first-admin.mjs`, run with `npm run seed:admin`. It is needed only for the very first super-admin.
- It uses the Admin API (`auth.admin.createUser`) with the service-role key. It sets `email_confirm: true` and `app_metadata.role = 'super_admin'`.
- It is idempotent. If a super-admin already exists, it exits without changes.
- Environment variables, documented in `.env.example` (`.env` stays git-ignored):
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server and scripts only, never exposed to the browser)
  - `FIRST_ADMIN_EMAIL`
  - `FIRST_ADMIN_PASSWORD` (temporary; remove it after first login)
  - `FIRST_ADMIN_NAME`
- The first super-admin changes the temporary password on first login through the built-in recovery flow (`resetPasswordForEmail` and `updateUser`).

### Managing roles from Account settings
- A super-admin-only "Team members" panel lists registered users (`auth.admin.listUsers` behind a server route) and the pending access requests.
- Promote, change tier or remove staff status via `auth.admin.updateUserById` on a server route that first confirms the caller is `super_admin`.
- Guardrails: no self-demotion, and the last super-admin can't be demoted.
- A role change takes effect when the affected user's token refreshes or on next sign-in. The panel says so.
- Inviting someone with no account uses the built-in `auth.admin.inviteUserByEmail`.

### Audit log
- Create an `audit_log` table (actor id, target id, action, old role, new role, created at). Written only by server routes using the service role. Readable only by super-admins (RLS). No updates or deletes.

### Abuse protection
- Use Supabase Auth's built-in rate limits (sign-in, sign-up, email, token refresh) and configure them in the dashboard.
- Use Supabase's built-in CAPTCHA protection (hCaptcha or Cloudflare Turnstile) and pass the captcha token in `signUp` and `signInWithPassword`.
- Lockouts: rely on Supabase rate limiting per IP and per user for temporary blocking. Surface the resulting error to the user.

### Account self-management
- Profile edit: `auth.updateUser({ data: { full_name } })`.
- Avatar: Supabase Storage bucket `avatars` with RLS so users write only to their own folder. The public URL is saved in `user_metadata.avatar_url`.
- Account deletion: a server route calls `auth.admin.deleteUser` for the signed-in caller after confirmation. Content is anonymised by a foreign-key rule (set null / display as "Deleted user").

### UI and validation libraries
- Use Nuxt UI for components (modal, forms, dropdown, toasts). It must be configured to work with the existing Tailwind CSS setup and the theme tokens.
- Use a validator library for input validation. Pick one schema-based library and use it for all forms in this feature. Supabase Auth still performs its own server-side checks.

## Implementation Steps

Each step ends with something usable and reviewable on its own. Requirement numbers refer to the Requirements section.

### Step 1. Supabase foundation and customer social sign-in
- Set up the Supabase project, the `@nuxtjs/supabase` module, environment variables and `.env.example`.
- Install Nuxt UI and the validator library and configure them alongside Tailwind.
- Enable Google, GitHub and Apple providers and the redirect URLs.
- Build the authentication modal with the three social buttons and the header "Sign in" entry point.
- Handle the OAuth callback, failed or cancelled sign-in, and returning the user to where they were.
- **Done when:** a visitor can sign in with any of the three providers, and failures leave them signed out with read-only access.
- **Covers:** 1–8, 13 (social part), 15, 16, 17.

#### Tests
- Unauthenticated visitors can browse the public board and idea detail pages without being redirected.
- Clicking "Sign in" in the header opens the authentication modal displaying Google, GitHub, and Apple buttons.
- Selecting Google, GitHub, or Apple triggers OAuth with PKCE flow.
- A successful OAuth callback redirects the user back to the originating page with their verified name and avatar retrieved from provider metadata.
- Cancelling or failing social sign-in displays an error message, leaves the user unauthenticated, and preserves access to public pages.
- Header displays "Sign in" when signed out, and the user's avatar, name, and a sign-out button when signed in.

### Step 2. Signed-in state and gated actions
- Add the status indicator (avatar, name, sign-out) and a single shared session state.
- Add a reusable "require sign-in" mechanism for submit, vote and comment. It opens the modal and resumes the pending action after sign-in.
- **Done when:** one sign-in covers all gated actions, and the user keeps their place.
- **Covers:** 4, 5, 6, 7, 15.

#### Tests
- Attempting to submit an idea, cast an upvote, or post a comment while unauthenticated opens the auth modal.
- Completing authentication after triggering a gated action resumes the pending action without losing context (such as entered form text).
- A verified session is shared across all actions (submitting, voting, commenting) without requiring repeated verification.
- Signing out clears local session state, resets personal upvote highlights, and restores the unauthenticated header.
- Customer email addresses remain private and never appear on the public board or in public API responses.

### Step 3. Roles and first super-admin bootstrap
- Define the `customer`, `moderator` and `super_admin` tiers in `app_metadata.role`.
- Add row-level security helpers and the server-side role checks.
- Write the seed script and finalise the env variables.
- **Done when:** running `npm run seed:admin` creates the first super-admin once, and re-running changes nothing.
- **Covers:** 10, 12, 19, 24 (tiers), 29.

#### Tests
- Customer registration and social sign-in default strictly to the `customer` role and never grant staff privileges.
- Running `npm run seed:admin` creates the first super-admin account with confirmed email and `super_admin` role in `app_metadata`.
- Running `npm run seed:admin` a second time is idempotent and makes no modifications when a super-admin exists.
- The service-role key is restricted to server routes and scripts, and is never exposed in browser bundles.
- Server-side role checks and RLS policies block non-staff users from accessing staff-only routes and data with 403 Forbidden.

### Step 4. Team login
- Build the separate team login form, with clear errors on invalid credentials.
- Add a forced temporary-password change for the first super-admin, using the built-in recovery flow.
- Guard staff-only routes.
- **Done when:** a staff member can sign in and reach staff-only areas, and a customer cannot.
- **Covers:** 9, 10, 11, 12, 14, 18.

#### Tests
- Team login presents a dedicated form with company email and password fields, completely separate from customer social sign-in.
- Authenticating with valid staff credentials grants access to staff areas (internal dashboard).
- Submitting invalid credentials shows a clear error message and denies access.
- First super-admin logging in with temporary credentials is required to update their password before proceeding.
- Authenticated team members can perform all customer actions (submit, vote, comment) alongside staff privileges.
- Customers cannot sign in through the team login form or access staff routes.

### Step 5. Customer email and password
- Add customer sign-up and sign-in with email and password, using Supabase email confirmation.
- Add inline form validation and automatic account linking when identities share an email.
- **Done when:** a customer can register, confirm their email and sign in without a social provider.
- **Covers:** 13 (email option), 20, 34 (customer forms).

#### Tests
- Customer auth modal provides email/password registration and sign-in options alongside social buttons.
- Form inputs validate email syntax and required password rules with inline error messages.
- New customer registration dispatches an email confirmation link and enforces confirmation before sign-in.
- Confirmed customers can sign in with valid credentials and receive the default `customer` role.
- Signing in or registering with an email matching an existing verified social account automatically links both identities.

### Step 6. Abuse protection
- Configure Supabase rate limits and CAPTCHA, and send the CAPTCHA token from the sign-up and sign-in forms.
- Show clear messages for rate-limited or locked-out attempts.
- **Done when:** automated or repeated failed attempts are blocked, and the user is told why.
- **Covers:** 21, 22, 23.

#### Tests
- Sign-up and sign-in submissions without a valid CAPTCHA token are blocked.
- Exceeding configured rate limits returns an informative rate-limit error message to the user.
- Repeated failed login attempts trigger temporary account/IP lockout and clearly notify the user.

### Step 7. Account settings: profile, avatar, deletion
- Add the Account settings page with display-name editing, avatar upload (Storage bucket and RLS) and account deletion with a confirmation step.
- Apply the deleted-user content rule so the board stays consistent.
- **Done when:** a user can edit their profile, change their avatar and delete their account safely.
- **Covers:** 31, 32, 33, 34 (profile).

#### Tests
- Signed-in users can update their display name and see the change reflected across the UI.
- Avatar image uploads validate allowed file types/sizes, upload to the user's storage bucket folder, and update `avatar_url`.
- RLS rules prevent users from uploading or modifying avatar files in other users' storage paths.
- Account deletion requires an explicit user confirmation step before taking action.
- Deleting an account removes auth records and anonymises the user's ideas, votes, and comments as "Deleted user".

### Step 8. Role management and audit log
- Add the `audit_log` table, written only by the server.
- Build the super-admin "Team members" panel: list users, promote, change tier or remove staff status, with the self-demotion and last-super-admin guardrails.
- Add the audit log view for super-admins.
- **Done when:** a super-admin can change roles from Account settings, every change is logged, and the guardrails hold.
- **Covers:** 24, 27, 28, 30.

#### Tests
- Super-admin "Team members" panel and audit log view are accessible strictly to users with the `super_admin` role.
- Super-admin can promote users to `moderator` or `super_admin`, or demote staff to `customer`.
- Super-admin cannot demote their own account.
- The last remaining super-admin cannot be demoted or have staff status removed.
- Every role modification creates an immutable entry in `audit_log` with actor, target, timestamp, and old/new role.
- Non-super-admins and direct client calls cannot query or modify the `audit_log` table.

### Step 9. Staff access requests
- Add the `access_requests` table and RLS.
- Build the request form for signed-in users and the super-admin review queue (approve with a tier, or reject).
- Notify requesters of the outcome, and write decisions to the audit log.
- **Done when:** a user can request staff access and a super-admin can approve or reject it end to end.
- **Covers:** 25, 26, 30.

#### Tests
- Signed-in non-staff users can submit a staff access request with an optional message.
- Requesters can view only their own submitted requests via RLS.
- Super-admins can review all pending access requests in the management queue.
- Approving a request updates the requester's tier, sends an email notification, and records the action in `audit_log`.
- Rejecting a request updates request status, sends an email notification, and logs the decision in `audit_log`.
- Requesters have no staff privileges until approval is granted.

### Step 10. Hardening and acceptance pass
- Walk through every requirement and edge case, including permissions (customer vs moderator vs super-admin) and email privacy.
- Check responsive layout and light and dark themes on the auth screens.
- **Done when:** all requirements 1–34 are verified and no known gaps remain.

#### Tests
- Full end-to-end customer flow (social sign-in, idea submit, vote, comment, profile edit, sign-out) functions seamlessly.
- Full end-to-end staff flow (credential login, staff badge, internal notes, dashboard triage, role management) functions with enforced permissions.
- Customer emails are verified to remain private across all public board views and public APIs.
- Auth screens and modals render correctly on mobile and desktop viewports in both light and dark themes.
- Application builds cleanly with `npm run build` and runs without errors or console warnings.
