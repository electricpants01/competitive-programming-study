# CP Slide Decks — Feature Spec

## Summary

Standalone 1920×1080 HTML teaching slides per topic under `slides/<topic>/`, exported to PNG with Puppeteer (`generate-pngs.cjs`). Distinct from the Astro intro slides presentation.

Canonical skill: `AI/skills/cp-slides.md`. Agent: `AI/agents/slide-author.md`.

## Goals

- One concept per slide; no overflow
- Consistent header + global slide numbering
- Correct C++17 examples with complexity notes
- PNG count matches HTML count, 0 errors

## Non-goals

- Hosting these HTML files as Astro routes by default (assets/teaching artifacts)
- Automatic translation of slide decks

## Links

- UI: `ui.md`
- Data: `data.md`
- Tickets: `tickets.md`
- Acceptance: `acceptance-tests.md`
