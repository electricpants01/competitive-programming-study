# 01 — Architecture

## High-level architecture

```
Browser
  → Astro-generated static pages under /competitive-programming-study/[lang]/…
  → loads public/*.js (algorithms-data, videos-data, icpc-*-data, guide-script, slides-script)
  → optional: fetch Codeforces API from the browser
  → optional: localStorage (theme, visited, CF favorites / solved)

Build-time / offline:
  scripts/scrape-videos.cjs + yt-dlp → public/videos-data-{en,es}.js
  slides/<topic>/generate-pngs.cjs + Puppeteer → PNG exports
  scripts/sync-ai-configs.sh → tool configs
```

No application backend. Persistence is static repo files or browser `localStorage`.

## Pages

| Route | File | Role |
|-------|------|------|
| `/` | `src/pages/index.astro` | Redirect → `/{base}/en/slides` |
| `/{lang}/guide` | `src/pages/[lang]/guide/index.astro` | App shell: topic browser + practice |
| `/{lang}/slides` | `src/pages/[lang]/slides/index.astro` | Intro slide presentation |

## Guide shell (alg0-inspired IA)

```
.site-app (h-screen flex column)
├── .site-header
└── .site-body (flex)
    ├── .site-sidebar (accordion)
    └── #main-content
        ├── [data-view="home"]
        ├── [data-view="topic"]
        ├── [data-view="search"]
        ├── [data-view="videos"]
        ├── [data-view="icpc-prelims"]
        └── [data-view="icpc-regionals"]
```

View router in `guide-script.js` shows exactly one view. Sidebar topic IDs open `topic`; practice IDs map via `PRACTICE_ITEM_SECTIONS`.

Deep links: `?section=search|videos|…`, `?topic=<id>`, or hash equivalents.

Design system: [03-design-system.md](./03-design-system.md), ADR-0009.

## Runtime scripts (`public/`)

| File | Role |
|------|------|
| `guide-script.js` | Shell router, sidebar, topic detail, CF/video/ICPC inits |
| `slides-script.js` | Slide navigation |
| `algorithms-data-{lang}.js` | Topics |
| `videos-data-{lang}.js` | Video library |
| `icpc-prelims-data.js` / `icpc-regionals-data.js` | Contest PDF indexes |

Scripts: `is:inline` + BASE_URL. Translations via `define:vars` → `window.__CP_T__` (JSON-safe templates + `fmt()`).

## Critical constraints

- BASE_URL always on links/scripts/redirects (ADR-0003)
- `<style is:global>` for JS-injected DOM (ADR-0004)
- Explicit `Translations` interface (ADR-0002)
