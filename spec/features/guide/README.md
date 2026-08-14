# Guide Shell — Feature Spec

## Summary

The Guide is the main learning surface: top nav, sidebar roadmap, and multi-section content (overview, algorithms grid, roadmap, topic detail, tools, plus Practice sections for search and videos).

## Goals

- Navigate the CP curriculum via sidebar sections
- Open topic detail panels from cards / sidebar items
- Switch visible page sections without full page reloads
- Host Practice features (`search`, `videos`, `icpc-prelims`) from the top-nav Practice dropdown

## Non-goals

- Editing topic content in the UI
- Server-side progress tracking

## User stories

- As a learner, I want a sidebar map of topics so I can jump to what I am studying.
- As a learner, I want topic detail (description, code, quiz, problems) in my language.
- As a learner, I want dark/light theme and EN/ES switch without losing my place when possible.

## Links

- UI: `ui.md`
- Data: `data.md`
- Tickets: `tickets.md`
- Acceptance: `acceptance-tests.md`

## Key rules

- Only one `data-section` visible at a time
- Practice items open via top-nav dropdown → `setActiveSection` (not sidebar)
- Sidebar labels from `t.sidebar.*`
