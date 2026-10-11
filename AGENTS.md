# Antigravity Agent Instructions (`AGENTS.md`)

## Project Context
You are working on the **Product Idea & Customer Feedback Platform** built with **Nuxt 4**, **Tailwind CSS v4**, and **Pinia**.
- **Specification:** [`spec.md`](spec.md)
- **Feature Breakdown:** [`features.md`](features.md)
- **Approved Visual Reference:** [`preview.html`](preview.html)

---

## Current Objective: Scaffold Overall App Layout (Design-Only)

Create the overall app layout and visual shell (`layouts/default.vue`) for the project. This is strictly a **design-based UI scaffolding step**—do NOT implement backend logic, authentication, or database operations yet.

### Key Layout Requirements

1. **Header & Navigation Bar (`<header>`):**
   - **Text-Based Logo:** Clean typographic logo (e.g. `acme / ideas` in semi-bold text with subtle emerald branding).
   - **Navigation Menu:** Links for primary views:
     - `Board` (active state)
     - `Roadmap`
     - `Internal Dashboard` (Staff portal link)
   - **Right-Side Utility Actions:**
     - **Theme Toggle:** An icon button switching between light and dark modes (Sun / Moon) via `@nuxtjs/color-mode`.
     - **New Suggestion Button:** A prominent `+ Submit an Idea` button (styled with emerald green `#1b6b45`, white text, rounded corners, hover states, design placeholder).
     - **Profile / Sign-In Placeholder:** A clean avatar icon or "Sign in" button placeholder.

2. **Main Content Slot Area (`<main>`):**
   - Centered container (`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full`).
   - Renders `<slot />` cleanly with proper spacing and responsive margins.

3. **Footer (`<footer>`):**
   - Minimalist, subtle footer with product branding, copyright, and lightweight status badge.

4. **Integration in `app/app.vue`:**
   - Ensure `app/app.vue` wraps pages using `<NuxtLayout><NuxtPage /></NuxtLayout>`.
   - Ensure a clean starter page exists in `app/pages/index.vue` rendering inside the layout.

---

### Constraints & Guardrails
- **Design-Only:** Keep this task 100% focused on UI layout, components, and Tailwind styling.
- **Do Not Invent Features:** Rely strictly on the visual aesthetic in `preview.html`.
- **Zero Errors:** Ensure the layout compiles cleanly with Nuxt 4 dev server and responsive on mobile/desktop.
