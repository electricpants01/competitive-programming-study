# ADR 0004 — Plain JS guide interactivity in `public/`

## Status

Accepted

## Context

The guide needs a dynamic sidebar, section switching, CF search UI, and video library UI. Astro islands/React would add complexity for mostly DOM scripting.

## Decision

- Keep runtime logic in `public/guide-script.js` and `public/slides-script.js`
- Load with `is:inline` + BASE_URL
- Use `<style is:global>` for classes applied to JS-created elements

## Alternatives considered

- React/Preact islands — heavier for this interaction surface
- Inline scripts only in Astro — harder to maintain large features

## Consequences

- Bundle tooling does not process these scripts (plain JS)
- Scoped CSS will silently fail on injected nodes — authors must remember `is:global`
- Feature inits (`initCfSearch`, `initVideoSearch`) live in one file; split if it grows too large
