# Product Features & Implementation Order (`features.md`)

This document outlines the core product features arranged in a progressive 12-step implementation order, from foundational authentication and the customer feedback loop to team tooling and automated background communications.

---

## 1. Registration & Login

- **Description:** Provides frictionless 1-click social sign-in (Google and GitHub) for customers and secure company credential authentication for internal team members.
- **User Flow:**
  - **Customer Flow:** A visitor clicks "Sign In" or triggers authentication when submitting an idea or voting $\rightarrow$ selects Google or GitHub $\rightarrow$ gets verified in 1 click with their name and email automatically retrieved (no passwords required).
  - **Team Member Flow:** An employee enters their company email and password $\rightarrow$ signs in to access internal management capabilities.
- **UI Overview:**
  - Authentication modal with prominent "Continue with Google" and "Continue with GitHub" buttons.
  - Dedicated team login form with email and password fields.
  - User status indicator showing verified avatar, name, and sign-out option.

---

## 2. Account Management

- **Description:** Allows team members and customers to manage their authentication state, view profile information, sign out, and securely recover forgotten passwords without getting locked out.
- **User Flow:**
  - **Password Reset Flow:** A team member clicks "Forgot password?" on the login screen $\rightarrow$ enters their company email $\rightarrow$ receives a secure recovery link $\rightarrow$ sets a new password.
  - **Profile & Session Flow:** Authenticated users open their profile menu $\rightarrow$ view their account details $\rightarrow$ click "Sign out" to clear their local session.
- **UI Overview:**
  - "Forgot Password" recovery modal with email input and confirmation state.
  - Profile dropdown menu displaying user avatar, display name, email, and "Sign Out" button.

---

## 3. Idea Submission

- **Description:** Enables customers to draft and submit feature requests with zero account creation friction, automatically capturing their verified identity while keeping contact information private.
- **User Flow:**
  1. The user clicks "+ Submit an Idea" on the board.
  2. The user enters a descriptive title and problem statement (no name field required, as the user's name is captured automatically during registration).
  3. If unauthenticated, the user completes 1-click Google or GitHub verification to activate the submission button.
  4. The user clicks "Submit Idea" to publish the request immediately to the public board.
  5. If the author needs to revise their submission later, they can edit the title and description, leaving a transparent public indicator.
- **UI Overview:**
  - Submission modal or drawer containing input fields for the idea title and problem description.
  - Dynamic "Submit Idea" button that activates once authenticated.
  - Privacy notice reassuring users that contact details remain private.
  - Subtle public `(edited)` audit badge displayed on any idea modified by its author.

---

## 4. Public Idea Board

- **Description:** A clean, centralized public board where customers can browse all community feature requests, view current vote counts, and track status badges in a single continuous feed.
- **User Flow:**
  1. A user navigates to the public feedback board.
  2. The user scrolls through the single-column list of ideas to explore requested improvements.
  3. Older ideas load automatically in batches of 100 as the user scrolls down (infinite scroll).
  4. The user toggles between light and dark themes using the theme switch.
- **UI Overview:**
  - Minimalist header featuring product branding, theme toggle, and "+ Submit an Idea" button.
  - Continuous vertical feed of idea cards showing vote count, title, short description, and colored status pill.
  - Intentionally minimalist layout with no search bars or category filter distractions for customers.

---

## 5. Idea Detail Page

- **Description:** A dedicated page for each feature request displaying full proposal details, author information, status progression, vote tallies, and community discussion.
- **User Flow:**
  1. A user clicks on any idea card from the public board.
  2. The user is taken to the idea's dedicated detail page (or permalink URL).
  3. The user views the complete problem description, submission date, current lifecycle status badge, vote count, and existing comments.
  4. The author can click "Edit" on this page to update the title or description.
- **UI Overview:**
  - Full-page or dedicated view with breadcrumb navigation back to the board.
  - Large idea title, full problem description, author attribution, and submission date.
  - Interactive upvote widget and colored status badge.
  - Section for community discussion and comment stream below the main description.

---

## 6. Voting

- **Description:** Enables customers to signal feature demand by casting verified upvotes on ideas, automatically subscribing them to future progress updates.
- **User Flow:**
  1. A user clicks the upvote button on an idea card or detail page.
  2. If not signed in, the user completes 1-click Google or GitHub verification.
  3. The vote is immediately registered, incrementing the count and highlighting the button (1 vote per user per idea).
  4. The user is automatically subscribed to receive email updates for that idea.
  5. If the user signs out, personal button highlight resets while the recorded vote count remains preserved on the board.
- **UI Overview:**
  - Dedicated upvote container on each idea card and detail view featuring an upward chevron and cumulative vote count.
  - Distinct highlighted border and accented styling indicating when the current user has upvoted that idea.
  - 1-click social verification prompt for unverified visitors trying to vote.

---

## 7. Comments

- **Description:** Provides an open, chronological discussion stream on each idea for community dialogue alongside a restricted internal notes tab for confidential team collaboration.
- **User Flow:**
  - **Customer Flow:** A customer opens an idea detail page $\rightarrow$ types a comment $\rightarrow$ completes 1-click verification if needed $\rightarrow$ comment posts immediately in chronological order.
  - **Team Member Flow:** A team member signs in with company credentials $\rightarrow$ can post official public replies displaying a visible **Staff** badge $\rightarrow$ or switch to the "Internal Notes" tab to add private interview insights, estimates, or links hidden from customers.
- **UI Overview:**
  - Chronological comment stream showing author avatar, name, timestamp, and message.
  - Distinct **Staff** badge next to team members' names on public comments.
  - Private "Internal Notes" tab switcher visible exclusively to company staff.
  - Comment composition box with formatting and "Post Comment" action button.

---

## 8. Internal Dashboard

- **Description:** A specialized administrative command center for internal team members to triage incoming feedback, search ideas, filter by status, sort by demand, and merge duplicate requests.
- **User Flow:**
  1. A team member signs in and opens the internal dashboard.
  2. The team member searches for keywords across feedback titles and descriptions.
  3. The team member filters ideas by lifecycle status (e.g., Under Review, Planned, In Progress, Completed, Declined).
  4. The team member sorts the list by vote count (highest demand) or by comment count (highest discussion).
  5. The team member can merge duplicate ideas into a primary request, automatically transferring votes, consolidating subscribers, and setting up redirection.
- **UI Overview:**
  - Administrative command bar with search input, status filter dropdown, and sort order selector (by votes or comments).
  - Triage table or list view showing idea titles, submitter contact details, vote totals, comment counts, and quick management actions.
  - Duplicate merge tool with target selector and vote consolidation preview.

---

## 9. Status Management

- **Description:** Allows team members to transition ideas through standardized lifecycle stages (Under Review, Planned, In Progress, Completed, Declined) to communicate roadmap progress to customers.
- **User Flow:**
  - **Customer Flow:** Customers see colored status badges on the board and detail pages; if an idea is declined, they can read the official team reasoning directly on the item.
  - **Team Member Flow:** A team member selects a new status from the management dropdown and optionally writes an explanation or release note to accompany the change.
- **UI Overview:**
  - Color-coded status badges: Under Review (yellow/neutral), Planned (blue), In Progress (amber), Completed (green), and Declined (muted red/slate).
  - Status transition dropdown selector for team members.
  - Official team explanation banner on declined ideas detailing why the idea will not be pursued.
  - Unified board display where all ideas—including completed and declined—remain permanently visible.

---

## 10. Customer Notifications

- **Description:** Automatically sends email progress updates to submitters and voters whenever an idea advances on the roadmap, complete with 1-click unsubscribe links.
- **User Flow:**
  1. A team member updates an idea's status or publishes a release note.
  2. The system automatically sends an email notification to the idea's original author and all voters.
  3. The customer opens the email to read the update and team message.
  4. The customer can click a 1-click unsubscribe link in the footer to opt out of updates for that idea or all ideas without logging in.
- **UI Overview:**
  - Formatted email notification template containing the idea title, updated status pill, team release message, and 1-click unsubscribe footer links.

---

## 11. Notification Preferences

- **Description:** A dedicated self-service settings page where verified customers can review all ideas they follow and granularly manage their email notification settings.
- **User Flow:**
  1. A verified customer opens their Notification Preferences page from their profile menu or via an email link.
  2. The page displays a list of all ideas the customer has submitted or upvoted.
  3. The customer can toggle email updates on or off for specific ideas individually.
  4. The customer can toggle a master switch to pause or resume all notifications across the platform.
- **UI Overview:**
  - Clean account preferences page listing followed ideas with their title, vote count, and current status badge.
  - Individual notification toggle switch beside each followed idea.
  - Master switch to pause or resume all email communications globally.
  - Bulk opt-out action to unsubscribe from all ideas in one click.

---

## 12. Team Digest

- **Description:** A daily compiled email digest sent to team members summarizing new customer comments and discussions from the past 24 hours, eliminating real-time notification spam.
- **User Flow:**
  1. Customers submit comments and participate in discussions throughout the day.
  2. The system suppresses individual per-comment real-time email alerts to avoid cluttering team inboxes.
  3. Once every 24 hours, the system generates and dispatches a compiled Daily Digest email to all team members.
  4. Team members review the digest to see recent activity grouped by idea and click directly through to ideas requiring attention.
- **UI Overview:**
  - Clean Daily Digest email template organizing new customer comments under their corresponding idea titles.
  - Activity counts, direct links to ideas, and author names (with 'Staff' labels for team responses).
