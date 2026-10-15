I want to build a product idea system for my company to allow customers to submit ideas, my team to see them, comment on them externally and internally, and update their status, notifying customers of their progress. Create a spec.md file for this please.

Please remove any reference to individuals in the spec

Can we consolidate team members and admins into one? No need for separate roles here.

Please remove any technical details from the core features (including proposed fields)

Remove Data Model & Architecture, Implementation Roadmap & Milestones, Success Metrics (KPIs)

---

Add a section around technical stack. We're using Nuxt 4, Vue 3 and Postgres. We're using Tailwind CSS for styling.

Correct a section around technical stack. We're using NestJS, Nuxt 4 and Postgres. We're using Tailwind CSS for styling.

---

Using this spec, tell me what you'd end up building in detail. Tell me the features you'd add in detail, the flows you'd create and the technical decisions you'd make.
Update spec to specify:

- We are using supabase for authentication and placing database (PostgreSQL + Prisma)
- We are using Tailwind CSS v4
- We are using light and dark themes
- We are using nodemailer to send email

---

Using spec.md, please generate what you think [feature/page] will look like.

Please specify in spec.md that we don't need [feature] for [page].

Please regenerate the example design

---

What if [service] goes down?

Ok, let's swap out [previous feature/service/mechanism], and replace with [new feature/service/mechanism]

---

Based on the spec, what might we have missed?

Please give me choosable options for each of these one by one, so I can decide.

---

Read spec.md and extract the core product features. Create a new document called features.md.
For each feature include:
- Feature name
- Short description (1–2 sentences)
- User flow (how a user interacts with this feature step-by-step)
- UI overview (what the user sees or interacts with)
Keep everything high level and product-focused.
Do NOT include:
- database schemas
- file names
- file paths
- class names
- API endpoints
- implementation details
Only include features that are clearly described in spec.md. Do not invent new features.

Could you re-arrange these in a sensible implementation order?

Can you sync back any changes we made to the features here into the original spec.md file so there are no discrepancies?

---

Generate an Antigravity Gemini 3.8 Flash prompt to create an overall app layout for our project, including logo (text based), menu items, new suggestion button, and main slot content area. This should be design based only and not functional yet. We're scaffolding our boilerplate.

```markdown
You are an expert Nuxt 4 and frontend design engineer working on our Product Idea & Customer Feedback Platform.

### Task Goal
Create an overall app layout and visual shell (`layouts/default.vue`) for our Nuxt 4 boilerplate. This is strictly a **design-based UI scaffolding step**—do not implement backend logic, authentication, or database operations yet.

### Tech Stack & Design Reference
- **Framework:** Nuxt 4 (Vue 3, `<script setup lang="ts">`)
- **Styling:** Tailwind CSS v4
- **Theming:** `@nuxtjs/color-mode` (support dark & light modes seamlessly)
- **Reference Design:** Refer to `preview.html` and `spec.md` for aesthetic direction (neutral stone backgrounds, emerald/forest green primary accents `#1b6b45`, subtle borders, modern typography).

---

### Layout Specifications

1. **Header & Navigation Bar (`<header>`):**
   - **Text-Based Logo:** Clean, modern typographic logo (e.g., `acme` in semi-bold + ` / ideas` in muted/emerald text).
   - **Navigation Menu:** Links for primary views:
     - `Board` (active state)
     - `Roadmap`
     - `Internal Dashboard` (or Staff Portal link)
   - **Right-Side Utility Actions:**
     - **Theme Toggle:** An icon/button switching between light and dark modes (Sun / Moon) using Nuxt Color Mode.
     - **New Suggestion Button:** A prominent, styled `+ Submit an Idea` button (emerald green background `#1b6b45`, white text, rounded-lg, hover states, inactive/design placeholder for now).
     - **Profile / Sign-In Placeholder:** A clean avatar icon or "Sign in" button placeholder.

2. **Main Content Slot Area (`<main>`):**
   - Centered container (`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full`).
   - Renders `<slot />` cleanly with proper spacing and responsive margins.

3. **Footer (`<footer>`):**
   - Minimalist, subtle footer with product branding, lightweight copyright, and privacy note.

4. **Integration in `app/app.vue` & `app/pages/index.vue`:**
   - Update `app/app.vue` to use `<NuxtLayout><NuxtPage /></NuxtLayout>`.
   - Create a clean placeholder `app/pages/index.vue` rendering inside the layout to visually demonstrate the layout shell.

---

### Constraints
- Keep it 100% design- and layout-focused. Do NOT build database queries, API endpoints, or Pinia store logic yet.
- Ensure zero console errors, responsive mobile/tablet layout support, and full light/dark theme compatibility.
- Test the layout on the local dev server (`http://localhost:3000`).
```

---

Extract the feature [feature] from features.md into its own markdown document, feature-[FEATURE_NAME].md.
Instructions:
- Preserve the original intent of the feature
- Pull in any relevant requirements, constraints, assumptions, dependencies, edge cases, and related notes from elsewhere in features.md or spec.md
- Exclude unrelated features or implementation details that do not directly support this feature
- Rewrite the extracted feature into a clean, structured spec that is easier to plan in detail
Output format:
# [Feature Name]
## Summary
A short plain-English summary of the feature and its purpose.
## Goals
Clear outcomes this feature should achieve.
## Requirements
Functional requirements only for this feature.
Do not start designing the solution yet
Do not propose any low level technical decisions

Remove [section], [section], etc.

---

Add a technical section and include:
- [Technical item 1]
- [Technical item 2]

How might you build this based on this feature document only? Give me the technical decisions you'd make in a simple list.

How are you going to implement [feature/mechanism]?

---

What helpful additions might you sprinkle in if building this that we don’t want?

Add these to the constraints section and/or update applicable sections of the feature plan:
- *[Feature you don't want]
- *[Package you don't want to include]
- *Etc.

---

Add a new section, “Implementation Steps” and break up this feature into smaller, ordered implementation steps. These steps should be large enough to add a significant and usable feature, but small enough that we can comfortably review it.

---

Generate a Claude Code prompt for Implementation Step [step number], taking into account the context from this feature file, our features.md file and spec.md file.

# Task: Implementation Step 1 — Supabase foundation and customer social sign-in

## Context
Project: Product Idea & Customer Feedback Platform (Nuxt 4, Tailwind CSS v4, Pinia).
Read these first and treat them as the source of truth:
- `docs/feature-registration-and-login.md` (this feature; see "Implementation Steps → Step 1", plus Requirements 1–8, 13, 15, 16, 17 and the Technical section)
- `features.md` (feature 1: Registration & Login)
- `spec.md` (sections 1.3, 2, 4.1, 5 and 6)
- `preview.html` (approved visual reference), `AGENTS.md`, and `app/layouts/default.vue`

`AGENTS.md` describes an earlier design-only layout task. This task supersedes its "design-only / no authentication" rule for the auth-related work only. Keep the existing layout look and feel.

Current state:
- `@nuxtjs/supabase` is installed but commented out in `nuxt.config.ts`.
- The header in `app/layouts/default.vue` has a "Sign in" placeholder button.

## Goal
A visitor can sign in with Google, GitHub or Apple from an authentication modal. A failed or cancelled sign-in leaves them signed out with read-only access. After a successful sign-in they return to the page they were on.

## Scope (do this)
1. **Supabase setup**
   - Enable `@nuxtjs/supabase` in `nuxt.config.ts`. Set `redirect: false` so public pages stay public. Configure the callback route.
   - Add `.env.example` with `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (comment: server and scripts only, never exposed to the browser), `FIRST_ADMIN_EMAIL`, `FIRST_ADMIN_PASSWORD` and `FIRST_ADMIN_NAME`. Make sure `.env` is git-ignored.
   - Document the Supabase dashboard setup in the README: enable Google, GitHub and Apple providers, add the redirect URLs, and note that Apple needs a service ID and key.
2. **UI libraries**
   - Install and configure **Nuxt UI** for components, working with the existing Tailwind v4 setup and light/dark theme tokens. Do not break the current look.
   - Install **one** schema-based validation library. Choose Zod unless you have a strong reason not to, and tell me what you chose. It isn't needed for the social buttons yet, so only install and note it.
3. **Authentication modal**
   - Build an auth modal (use Nuxt UI) with prominent "Continue with Google", "Continue with GitHub" and "Continue with Apple" buttons.
   - Use `signInWithOAuth` (PKCE) through the module's `useSupabaseClient`.
   - Do not add the email/password option yet (Step 5). Leave a clear place for it.
4. **Header integration**
   - The header's "Sign in" button opens the modal when signed out.
   - Show a minimal signed-in state: avatar and name from the provider's `user_metadata`, with a sign-out button. Use `useSupabaseUser`. The full status indicator and shared gated-action behaviour come in Step 2.
5. **Callback and errors**
   - Add the OAuth callback page/route. On success, return the user to the page they started from (store the return path before redirecting).
   - On error or cancellation, show a clear message (toast or inline) and leave the user signed out. Public read-only content must stay accessible.

## Out of scope (do NOT do)
- Roles, the seed script, team login, email/password sign-up, rate limiting, CAPTCHA, account settings, access requests, or audit log (later steps).
- Apple-only or provider-specific extras, additional providers (no magic links, phone or Microsoft), or other auth libraries.
- Any component library other than Nuxt UI. No extra packages beyond Nuxt UI and the one validation library.
- No username field and no forced redirect to the homepage.
- Never expose the service-role key to client code. Do not commit `.env`.

## Acceptance criteria
- With provider keys configured, I can sign in with Google, GitHub and Apple from the modal.
- Cancelling or failing the sign-in shows a message and leaves me signed out. The board and idea pages still work.
- After signing in I land back on the page I started from. Customer name and avatar come from the provider with no manual input.
- The header shows "Sign in" when signed out, and avatar, name and sign-out when signed in.
- Light and dark themes both look right. The layout works on mobile and desktop.
- `npm run dev` starts with no errors or warnings caused by your changes, and `npm run build` passes.

## Working style
- Make small, reviewable changes. Reuse existing components and styles.
- If something is ambiguous or a provider can't be tested without keys, say so in your summary instead of guessing.
- When done, summarise the changes by file, what you could and couldn't verify, and any follow-ups for Step 2.


---

Add a simple bulleted list of tests under a Tests heading for each implementation step.

Generate a Claude Code prompt to write tests for Implementation Step [step number], using [testing framework].

---
