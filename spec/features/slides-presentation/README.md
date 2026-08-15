# Slides Presentation — Feature Spec

## Summary

Intro / marketing slide deck at `/{lang}/slides`. Content lives in i18n (`t.slides.items`). Navigation is handled by `public/slides-script.js` (keyboard, dots, swipe, fullscreen).

## Goals

- Present structured slides (title, definition, grid, list, timeline, cta)
- Smooth directional transitions managed in JS
- Link CTA into the guide under the correct base + lang

## Non-goals

- Authoring teaching HTML decks (see `cp-slide-decks`)
- Auto-advance timer (unless added later)

## Links

- UI: `ui.md`
- Data: `data.md`
- Tickets: `tickets.md`
- Acceptance: `acceptance-tests.md`
