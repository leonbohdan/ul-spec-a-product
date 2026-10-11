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

Generate a Claude Code prompt to create an overall app layout for our project, including logo (text based), menu items, new suggestion button, and main slot content area. This should be design based only and not functional yet. We're scaffolding our boilerplate.
