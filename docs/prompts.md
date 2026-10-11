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
