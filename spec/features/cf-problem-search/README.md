# Codeforces Problem Search — Feature Spec

## Summary

Filter Codeforces problems by tags, rating range, and AND/OR combine mode. Paginate results; star favorites and mark solved with `localStorage` persistence.

Canonical skill: `AI/skills/cf-problem-search.md`. ADR: [0007](../../adr/0007-localstorage-cf-favorites.md).

## Goals

- Fetch problemset from Codeforces public API in the browser
- Filter / sort / paginate
- Favorites tab independent of last search
- Full i18n under `t.search.*`

## Non-goals

- Codeforces authentication / contest submit
- Cloud sync of favorites
- Problems without rating

## Links

- UI: `ui.md`
- Data: `data.md`
- Tickets: `tickets.md`
- Acceptance: `acceptance-tests.md`
