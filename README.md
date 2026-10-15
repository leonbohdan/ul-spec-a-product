# Product Idea & Customer Feedback Platform

> A lightweight, transparent, and frictionless customer feedback board where users can submit feature ideas, upvote suggestions, and track roadmap progress—powered by 1-click verification and a centralized internal management command center.

---

## 📌 Overview

Customer feedback often gets lost across scattered channels (emails, social DMs, chat widgets). This project defines the full product specification, UI prototype, and implementation roadmap for a dedicated feedback and roadmap platform designed to:
- Give customers a **dead-simple, barrier-free** way to submit feature requests and vote on existing ideas.
- Protect the platform from spam and ballot-stuffing using **1-click social authentication** (Google & GitHub) with zero password creation overhead.
- Provide internal product, dev, and support teams with a **unified command center** to prioritize requests, triage duplicates, document private notes, and update lifecycle statuses.
- Keep customers automatically informed via **resilient email progress notifications** with 1-click unsubscribe controls.

---

## 📂 Project Structure

```text
├── spec.md          # Comprehensive Product Specification (requirements, roles, tech stack)
├── features.md      # High-level product features (descriptions, user flows, UI overviews)
├── preview.html     # Interactive standalone HTML/Tailwind prototype of the customer board
├── README.md        # Project documentation and roadmap overview
└── docs/
    ├── prompts.md   # Prompt engineering & specification iteration history
    └── emails.txt   # Email template samples & notification formats
```

---

## 🚀 12-Step Implementation Roadmap

The product features are sequenced into a progressive, dependency-based implementation order:

| Step | Feature | Description |
|:---:|:---|:---|
| **01** | **Registration & Login** | 1-click Google/GitHub OAuth for customers; secure credential login for internal staff. |
| **02** | **Account Management** | Staff password reset recovery flow; user session and profile management. |
| **03** | **Idea Submission** | Zero-barrier idea creation; automated name capture on registration; `(edited)` audit badges. |
| **04** | **Public Idea Board** | Flat, minimalist continuous list with 100-batch infinite scroll and light/dark theme toggle. |
| **05** | **Idea Detail Page** | Dedicated permalink view with full description, vote counts, status, and comments. |
| **06** | **Voting** | 1-vote-per-user verified upvoting; automatic email subscription to updates; client-state tracking. |
| **07** | **Comments** | Chronological public discussions with **Staff** badges alongside private **Internal Notes** tab. |
| **08** | **Internal Dashboard** | Triage command center with real-time search, status filter, vote/comment sorting, and duplicate merging. |
| **09** | **Status Management** | Standardized lifecycle stages (`Under Review`, `Planned`, `In Progress`, `Completed`, `Declined` with reasons). |
| **10** | **Customer Notifications** | Event-driven status update emails with release notes and 1-click HMAC unsubscribe links. |
| **11** | **Notification Preferences** | Customer settings page with granular per-idea notification toggles and a master opt-out switch. |
| **12** | **Team Digest** | 24-hour compiled email digest of customer comments to prevent real-time notification fatigue. |

---

## 🛠 Tech Stack

- **Frontend:** Nuxt 4 (Vue 3)
- **Backend & Server Engine:** Nuxt 4 Nitro Server (API routes, server middleware)
- **State Management:** Pinia (`@pinia/nuxt`) for reactive vote and session tracking
- **Styling & Theming:** Tailwind CSS v4 (`@nuxtjs/tailwindcss`) with `@nuxtjs/color-mode` (native Light & Dark theme support)
- **Database & Auth:** PostgreSQL hosted on Supabase, accessed via Prisma ORM & Supabase Auth (`@nuxtjs/supabase`)
- **Email & Queue:** Nodemailer with an asynchronous background queue (`pg-boss` on PostgreSQL) featuring exponential backoff retries
- **Testing:** Vitest with `@nuxt/test-utils` and `happy-dom` for unit, store, composable, and component testing

---

## 🖥 Interactive Preview

An interactive visual prototype of the customer-facing feedback board is available in [`preview.html`](preview.html).

### Viewing the Prototype:
You can preview the interface directly by opening `preview.html` in any modern web browser or serving it locally:

```bash
# Using Python
python3 -m http.server 4040

# Or using npx serve
npx serve -l 4040 .
```

Then visit [http://localhost:4040/preview.html](http://localhost:4040/preview.html) to interact with:
- The responsive feedback board layout matching the napkin sketch.
- Light and dark theme switching.
- 1-click social verification modal and dynamic submission button states.
- Client-side reactive upvoting with persistent count preservation.
