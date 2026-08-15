# 00 — Overview

## Summary

Competitive Programming Study is a bilingual (EN / ES) learning platform for competitive programming. It is a **static Astro site** deployed to GitHub Pages — no application backend. Interactive features run in the browser against static data files and the public Codeforces API.

## Principles

1. **Static-first**: ship HTML/CSS/JS; no server runtime.
2. **Bilingual by default**: every user-facing string exists in EN and ES.
3. **BASE_URL aware**: all links and assets work under `/competitive-programming-study/`.
4. **Incremental delivery**: add topics, videos, and UI sections as vertical slices.
5. **AI-maintainable**: decisions live in `spec/`; agent guidance lives in `AI/`.

## Current capabilities

| Capability | Description | Spec |
|---|---|---|
| Guide | Sidebar learning map, topic cards, detail panels, roadmap, tools | `features/guide/` |
| Algorithms content | Topic data (examples, quizzes, practices) in EN/ES JS files | `features/algorithms-content/` |
| Slides presentation | Marketing / intro slide deck with keyboard & touch nav | `features/slides-presentation/` |
| CF Problem Search | Filter Codeforces problems by tag/rating; favorites & solved | `features/cf-problem-search/` |
| Video Library | Browse curated CP YouTube videos with transcript deep-links | `features/video-library/` |
| Video scraper | Offline pipeline to refresh `videos-data-*.js` via yt-dlp | `features/video-scraper/` |
| CP slide decks | 1920×1080 HTML teaching slides → PNG via Puppeteer | `features/cp-slide-decks/` |

## Non-goals (for now)

- User accounts / authentication
- Server-side problem judging or code execution
- Paid courses or LMS features
- Mobile native apps
- Real-time collaboration

## Repo map

```
spec/          ← this documentation
AI/            ← agent rules, skills, personas (synced to tool configs)
src/           ← Astro pages, i18n, components
public/        ← static assets + client JS + data files
scripts/       ← scrapers, AI sync
slides/        ← standalone HTML/PNG teaching decks
.github/       ← deploy workflow
```

## How to add a feature

1. Create `spec/features/<feature-name>/` using `spec/templates/feature-template.md`.
2. Write `ui.md`, `data.md`, and `acceptance-tests.md`.
3. Break down work in `tickets.md` using `spec/templates/ticket-template.md`.
4. Implement (Astro template + `public/` script and/or data files + i18n keys).
5. Ensure EN and ES stay in sync; update docs if behavior changes.
6. If agents need new guidance, add/update `AI/skills/` and run `make sync-ai`.
