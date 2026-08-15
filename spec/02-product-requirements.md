# 02 — Product Requirements

## Problem statement

Competitive programming learners need a bilingual place to browse a curriculum like a topic browser, study algorithms with code and quizzes, and jump into practice tools (Codeforces, videos, ICPC archives).

## Target user

- Self-taught CP learners (beginner → intermediate), EN/ES
- Mentors using slides / guide for teaching

## Core user journeys

1. Land on Guide home (dark app chrome); pick a topic from the accordion sidebar.
2. Read topic detail + run the quiz in the main pane.
3. Open Practice destinations (CF search, videos, ICPC) from the same sidebar.
4. Switch EN ↔ ES and light/dark without losing BASE_URL correctness.
5. Optionally open intro slides (`/{lang}/slides`).

## Functional requirements

- Sidebar-first navigation; accordion categories
- Main-pane views: home, topic, search, videos, icpc-prelims, icpc-regionals
- Topic content EN/ES with stable IDs
- CF search: tags, rating, AND/OR, sort, pagination, favorites, solved
- Video library: channel / tag / keyword (+ transcript deep-links)
- ICPC prelims/regionals browsers
- Deep links `?topic=` and `?section=`

## Non-functional requirements

- Static GitHub Pages hosting
- alg0-inspired design system (ADR-0009)
- Type-safe i18n; JSON-safe string templates for client

## Out of scope

- Accounts / cloud sync
- Online judge / step visualizers like alg0
- Auto-translation

## Success criteria

- New topic = dual algorithms data + sidebar entry
- Practice tools reachable from sidebar without top-nav section buttons
- Dark default; light theme invert works
- Deploy from `main` serves under `/competitive-programming-study/`
