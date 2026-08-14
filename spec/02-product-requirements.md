# 02 — Product Requirements

## Problem statement

Competitive programming learners need a single bilingual place to:

1. Follow a structured topic roadmap
2. Study algorithm explanations with code and quizzes
3. Find practice problems on Codeforces by tag/rating
4. Watch curated tutorial videos (with transcript search when available)
5. Present or review intro material as slides

## Target user

- Primary: self-taught CP learners (beginner → intermediate), Spanish and English speakers
- Secondary: instructors / club mentors using slides and the guide for teaching

## Core user journeys

1. Land on slides (or guide) in preferred language; switch EN ↔ ES without losing context.
2. Browse the sidebar learning map; open a topic detail (description, examples, quiz, problems).
3. Search Codeforces problems by tags + rating; star favorites; mark solved (persists locally).
4. Browse the video library by channel / tag / keyword; open YouTube at a transcript timestamp.
5. Navigate the intro slide deck with keyboard, dots, or swipe; go fullscreen; jump to the guide.

## Functional requirements

- Locale routing under `/[lang]/…` with EN default.
- Guide sections: overview, algorithms, roadmap, detail, tools, search, videos.
- Topic content available in both languages with matching topic IDs.
- CF search: tag cloud, AND/OR combine, rating range, sort, pagination, favorites, solved.
- Video library: channel filter, tag cloud, keyword search, transcript match chips.
- All production URLs work under the GitHub Pages base path.

## Non-functional requirements

- Static hosting only (GitHub Pages).
- Fast first paint; interactivity via lightweight plain JS.
- Maintainable i18n (type-safe `Translations` interface).
- Content updates (topics / videos) should not require framework changes.

## Out of scope (for now)

- Accounts, cloud sync of favorites
- Online judge / code runner
- Auto-translated content (human EN/ES pairs)
- Progressive Web App offline package beyond browser cache

## Success criteria

- New topic can be added by editing both algorithms data files + sidebar entries.
- New video channel can be added via registry + scraper re-run.
- New UI feature has a `spec/features/…` folder and matching i18n keys.
- Deploy from `main` publishes a working site at the documented GitHub Pages URL.
