# ADR 0009 — alg0-inspired design system

## Status

Accepted

## Context

The guide used a warm-paper light UI with blue primary accents and top-nav section switching. We want a denser, modern learning chrome closer to [alg0.dev](https://www.alg0.dev/): dark-first black canvas, pixel/mono typography, compact header, and sidebar-first topic browsing — without adopting alg0’s visualizer engine or leaving Astro.

## Decision

- Adopt alg0’s visual language: `--surface:#000`, hairline white borders, Geist Pixel Square + Geist Mono (self-hosted), dark default with light invert
- Rebuild Guide IA as an app shell: compact header + accordion sidebar + main workspace views (`home` | `topic` | practice destinations)
- Keep Astro static output, `public/*.js` interactivity, EN/ES i18n, and BASE_URL rules
- Restyle CF search, video library, ICPC views, and slides chrome to the same tokens

## Alternatives considered

- Visual-tokens-only restyle — rejected; top-nav section model still fights the alg0 topic-browser feel
- Tailwind + React rewrite — rejected; too large a migration for this repo
- Copying alg0 visualizers — out of scope; we teach via topic detail, quizzes, and practice tools

## Consequences

- Large CSS/HTML rewrite of the guide page; feature CSS classes (`.cf-*`, `.vl-*`, `.ip-*`) remapped to new tokens
- Default theme becomes dark; existing `cp-theme` localStorage still controls override
- Fonts must ship under `public/fonts/` for GitHub Pages
- Spec `03-design-system.md` and guide UI docs are the SSoT for chrome patterns going forward
