# ADR 0001 — Astro static site (no backend)

## Status

Accepted

## Context

We need a bilingual CP learning site that is cheap to host, easy to contribute to, and safe to expose publicly. There is no requirement for per-user server accounts or server-side judging.

## Decision

- Use Astro with `output: 'static'`
- Deploy to GitHub Pages
- Put interactivity in browser JS; persist personal state in `localStorage` only
- Keep large content as static data files under `public/`

## Alternatives considered

- Next.js / SSR — unnecessary hosting complexity for mostly static content
- SPA-only Vite React — weaker content/MDX story; we prefer multi-page Astro
- Custom backend — out of scope for v1

## Consequences

- No first-party API or database
- External data (Codeforces, YouTube via scraper) must be handled carefully (CORS, rate limits)
- All routing and assets must respect the GitHub Pages base path
