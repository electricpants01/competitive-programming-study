# ACM ICPC Regionals — Feature Spec

## Summary

Guide section that lists curated **ICPC regional** problem-set PDFs for offline practice.
Files are vendored under `public/icpc-regionals/` and linked with `BASE_URL`.

This is distinct from [icpc-prelims](../icpc-prelims/): prelims / qualifiers / sub-regionals stay
there; full regional finals live here.

## Goals

- Sidebar entry under PRACTICE, **below** `icpc-prelims`: `icpc-regionals`
- Browse contests by region (Europe, Asia, Latin America, …)
- Open / download local PDFs (no scrape at runtime)
- EN / ES i18n for UI chrome
- Optional editorial hook (same pattern as prelims) for future years

## Non-goals

- Hosting judge test data or interactive submission
- Auto-updating PDFs from the network
- Preliminary / qualifier contests (see `icpc-prelims`)
- Full World Finals archive (see icpcarchive)

## Links

- UI: `ui.md`
- Data: `data.md`
- Docs index: `docs/README.md`
- Tickets: `tickets.md`
- Acceptance: `acceptance-tests.md`
