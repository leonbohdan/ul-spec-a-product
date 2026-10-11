# Product Idea & Customer Feedback Platform — Specification (`spec.md`)

## 1. Executive Summary & Goals

### 1.1 Problem Statement
Customer feedback is currently scattered across unstructured channels (emails, Twitter/X DMs, website chat widgets, LinkedIn messages). This causes:
- Lost or unaddressed customer feature requests and feedback.
- Lack of visibility for product and development teams into customer priorities.
- Duplicate triage effort across team members.
- No transparency for customers regarding what is planned, under review, in progress, or delivered.

### 1.2 Product Vision
A lightweight, transparent, and frictionless customer idea board where customers can submit feature ideas, upvote existing suggestions, and track their progress through development. The platform provides internal teams with a centralized command center to prioritize roadmap items, add internal notes, and keep customers informed automatically.

### 1.3 Key Objectives
- **Dead Simple & Frictionless:** No forced account/password creation for customers to browse, vote, or submit ideas.
- **Spam & Abuse Protection:** 1-Click OAuth (Supabase Social Auth via Google or GitHub) ensures verified real identities before submitting ideas or casting votes, capturing user names automatically upon registration without manual name inputs.
- **Dual Discussion Channels:**
  - **Public Comments:** Visible to all customers and team members, with official team replies highlighted by a visible **Staff** badge.
  - **Internal Team Notes:** Strictly restricted to authenticated internal team members (e.g., customer interview insights, duplicate ticket references, technical estimates).
- **Dedicated Idea Detail Pages:** Individual permalink pages displaying full proposal descriptions, author attribution, status progression, vote totals, and community discussion.
- **Public Roadmap & Status Tracking:** Public dashboard displaying status badges (`Under Review`, `Planned`, `In Progress`, `Completed`, `Declined`) in a flat, unified feed.
- **Automated Customer Progress Notifications & Team Digest:**
  - Automated status updates delivered via email to submitters and voters with 1-click unsubscribe links.
  - Consolidated daily digest email sent to internal team members summarizing customer comments, preventing real-time notification spam.
- **Customer Notification Preferences:** Standalone self-service settings view allowing customers to manage per-idea subscription toggles and global notification controls.
- **Customer Privacy:** Customer identity (email address) is captured for notifications and follow-up, but kept private from the public dashboard.

---

## 2. User Roles & Permissions

| Role | Description | Permissions |
| :--- | :--- | :--- |
| **Customer / Visitor** | Any customer browsing, submitting, or voting. | - View public ideas list and status badges.<br>- View standalone idea detail pages.<br>- Upvote ideas (verified via 1-click Google/GitHub OAuth).<br>- Submit new ideas (Submit Idea button active only after 1-click Google/GitHub OAuth; name captured automatically on registration; no optional name field).<br>- View and post public comments.<br>- Receive automated progress notifications for submitted/upvoted ideas.<br>- Manage notification preferences on the Customer Notification Page.<br>- Sign out and clear local session state. |
| **Internal Team Member** | Any company employee (Product, Dev, Support). Unified role with full management permissions (no separate admin tier). | - All customer permissions.<br>- Access internal dashboard via company authentication (with search, filter by status, and ordering by vote and comment count).<br>- Reset forgotten password via secure email recovery flow.<br>- View submitter contact details (for follow-up).<br>- Post internal notes (strictly hidden from customers).<br>- Post official company public responses (distinguished with a visible **Staff** badge).<br>- Update idea statuses (triggering customer notifications).<br>- Receive a compiled daily digest of new customer comments and discussions (suppressing per-comment real-time email alerts).<br>- Moderate content, delete spam, and merge duplicate ideas.<br>- Configure status workflows and categories. |

---

## 3. Napkin Sketch Wireframe & UI Layout

Based directly on the initial napkin sketch wireframe:

```
+--------------------------------------------------------------------------------------------------+
|  Feedback Dashboard                                              [+ Submit an Idea]              |
+-----+-------------------------------------------------------------------------+------------------+
|Votes| Feedback Title & Description                                            | Status Badge     |
+-----+-------------------------------------------------------------------------+------------------+
|     | New Feature Request                                                     |                  |
| 35  | - Request to add a new feature.                                         | [ Under Review ] |
+-----+-------------------------------------------------------------------------+------------------+
|     | Improve Search Function                                                 |                  |
| 20  | - Enhance the search options.                                           | [   Planned    ] |
+-----+-------------------------------------------------------------------------+------------------+
|     | Bug in Checkout Process                                                 |                  |
| 15  | - Issue with payment steps.                                             | [ In Progress  ] |
+-----+-------------------------------------------------------------------------+------------------+
|     | Add Dark Mode                                                           |                  |
| 42  | - Option for dark theme.                                                | [  Completed   ] |
+-----+-------------------------------------------------------------------------+------------------+
```

---

## 4. Core Features & Implementation Order

### 4.1 Registration & Login
- **1-Click Social Verification (Customers):** Customers authenticate via 1-click Google or GitHub OAuth (Supabase Social Auth). Captures verified name and email with zero password creation overhead. Shared verified session across voting, idea creation, and comments.
- **Company Credentials (Internal Team):** Secure email and password authentication for internal team members to access the management portal with staff privileges.

### 4.2 Account Management
- **Password Reset (Staff):** Secure email-based password recovery flow so team members cannot get locked out of administrative capabilities.
- **Session & Profile Management:** Clear profile view displaying connected social account/email, with a sign-out mechanism that clears client state.

### 4.3 Idea Submission
- **Zero-Barrier Submission:** Customers compose ideas freely without creating new usernames or passwords.
- **Automated Name Capture upon Registration:** The user's name is taken directly from their social profile upon 1-click registration/verification; there is no separate or optional name field in the submission form.
- **Conditional Submit Button Activation:** To prevent spam and bot pollution, the "Submit Idea" button remains inactive (disabled) until the customer completes 1-click verification via Google or GitHub.
- **Submitter Privacy:** Customer contact information is kept private for team follow-ups and progress updates, and is never displayed publicly on the board.
- **Author Editing & Audit Badge:** Authors can edit their idea's title and description at any time while authenticated. An `(edited)` indicator is displayed publicly whenever an idea is modified.

### 4.4 Public Idea Board
- **Centralized Idea Board:** Customers can view all submitted feedback in one organized place, seeing what features and improvements other users are requesting.
- **Vote Counts & Status Badges:** Each item displays its community vote count and current development status so customers can easily see what is popular and where each idea stands.
- **Pure Minimalist List (No Search, Suggestions, or Filters):** To keep the customer-facing page dead simple, focused, and barrier-free, no search inputs, suggestion dropdowns, or category filters are included. Ideas are displayed in a single, clean list matching the napkin sketch.
- **Infinite Scroll Pagination (100 Ideas per Batch):** Fast initial page loads and seamless browsing with batches of 100 items loading automatically on scroll.
- **Theme Support:** Full support for both light and dark themes, adapting to user system preference with a manual toggle.

### 4.5 Idea Detail Page
- **Dedicated Permalink View:** Each idea has a standalone view displaying full problem description, author attribution, submission date, status badge, and community discussion.
- **Author Modification Controls:** Direct access for authors to edit their submitted idea's title and description.

### 4.6 Voting
- **Demand Signaling:** Customers can upvote ideas they want built, helping the team gauge genuine community interest and prioritize effectively.
- **1-Click OAuth Verified Voting:** 1-click Google or GitHub verification required before casting a vote. Each verified user is restricted to one vote per idea.
- **Client State & Sign-Out Behavior:** Upvoted items are reactively tracked via client state. Upon sign-out, personal upvote button highlights reset while recorded vote counts remain permanently preserved on the board.
- **Automatic Subscriptions:** Upvoting an idea automatically subscribes the customer's verified email to progress updates for that item.

### 4.7 Comments
- **Public Discussion Stream:** An open comment space on each idea where customers and team members can collaborate and clarify use cases.
  - **Shared 1-Click Verification:** Customers authenticate via 1-click Google or GitHub OAuth before posting.
  - **Staff Badge on Public Responses:** Team members posting in public discussions have a visible **Staff** badge displayed alongside their name to clearly distinguish official team responses.
  - **Chronological Stream:** Comments are displayed strictly in chronological order.
- **Internal Team Notes:** A private notes section visible exclusively to authenticated team members for internal context, customer interview notes, feasibility discussions, or linking related tasks without exposing internal discussions to customers.

### 4.8 Internal Dashboard
- **Administrative Command Center:** Authenticated team members have access to an internal triage view equipped with specialized tools to monitor feedback velocity and manage the roadmap.
- **Internal Dashboard Filters & Controls:**
  - **Search:** Real-time search across idea titles and descriptions.
  - **Filter by Status:** Filter by one or multiple lifecycle stages (Under Review, Planned, In Progress, Completed, Declined).
  - **Ordering / Sorting:** Ability to sort ideas by **vote count** (demand prioritization) and **comment count** (community discussion intensity).
- **Duplicate Idea Merging & Vote Consolidation:** Team members can merge duplicate ideas into a primary request. Votes are transferred and deduplicated, subscriber lists are merged, and the duplicate URL permanently redirects to the primary idea with a merged badge.

### 4.9 Status Management
- **Transparent Lifecycle Stages:** Ideas progress through clear, transparent stages:
  - **Under Review:** Open for community voting and team consideration.
  - **Planned:** Committed to the roadmap.
  - **In Progress:** Actively being developed.
  - **Completed:** Finished and live for customers.
  - **Declined:** Not pursued, accompanied by an official explanation banner.
- **Unified Flat Board Display:** All ideas across all lifecycle stages—including `Completed` and `Declined`—remain permanently visible in the single unified list with their distinctive colored status badges.

### 4.10 Customer Notifications
- **Automated Customer Progress Emails:** Whenever an idea's status changes (e.g., from Planned to In Progress, or In Progress to Completed), an automated email notification is queued and dispatched via Nodemailer to the original submitter and all customers who upvoted it.
- **Asynchronous Queue & Outage Resilience:** Email dispatch is managed via an asynchronous background job queue (`pg-boss` on PostgreSQL) with exponential backoff retries to guarantee delivery during mail provider downtime.
- **Release Communication:** Team members can include a short message in the notification explaining the progress or release details.
- **1-Click Tokenized Email Unsubscribe:** Every email includes secure HMAC-signed footer links allowing customers to opt out of updates for that specific idea or unsubscribe from all notifications with a single click, without requiring a login.

### 4.11 Notification Preferences
- **Dedicated Preferences Management:** A standalone settings view where verified customers can view all ideas they have submitted or upvoted.
- **Granular Notification Toggles:** Customers can mute or enable email notifications for specific ideas individually.
- **Master Control:** Customers can toggle a global switch to pause or resume all notifications across the platform at once.

### 4.12 Team Digest
- **Team Daily Digest (No Per-Comment Email Spam):** Team members are not notified by real-time email whenever a customer comments on an idea. Instead, a consolidated daily digest email is dispatched once every 24 hours summarizing new comments, discussions, and idea activity.

---

## 5. Security, Privacy & Anti-Abuse

1. **Submitter Privacy:** Customer email addresses are considered PII and are strictly accessible to authorized internal team members for follow-up communications, never exposed on the public dashboard.
2. **Access Control (Unified Internal vs. Public):**
   - Public access: Read ideas, upvote (with 1-click Google/GitHub OAuth), submit ideas (with 1-click Google/GitHub OAuth), and participate in public discussions.
   - Internal access: Authenticated via Supabase Auth with secure email-based password reset recovery. All team members share unified management capabilities: updating statuses, creating internal notes, moderating content, merging duplicates, and viewing submitter contact information.
3. **Anti-Spam & Delivery Resilience:**
   - 1-click social verification (Google/GitHub) guarantees real human identities and eliminates bot submissions for both idea creation and community voting.
   - Background queue with automated retries ensures notification delivery resilience during third-party email outages.
4. **Data Sanitization:**
   - Input sanitization on user-submitted titles, descriptions, and comments.

---

## 6. Technical Stack

- **Frontend Framework:** Nuxt 4 (Vue 3)
- **Backend & Server Engine:** Nuxt 4 Server Engine (Nitro) — full-stack architecture handling API routes, Prisma ORM, and email delivery without a separate backend framework
- **State & Storage Management:** Pinia (`@pinia/nuxt`) paired with Nuxt 4 and Vue 3 for reactive state management, local storage persistence, and client session/vote tracking
- **Database & ORM:** PostgreSQL hosted on Supabase, accessed via Prisma ORM
- **Authentication:** Supabase Auth (`@nuxtjs/supabase`) with 1-click Google/GitHub Social Auth for customers and secure team member login
- **Styling & Theming:** Tailwind CSS v4 (`@nuxtjs/tailwindcss`) with `@nuxtjs/color-mode` for seamless light and dark theme switching
- **Email Delivery & Resilience:** Nodemailer with an asynchronous queue (`pg-boss` on PostgreSQL) featuring automatic retries and exponential backoff
