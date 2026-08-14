# 01 — Architecture

## High-level architecture

```
Browser
  → Astro-generated static pages under /competitive-programming-study/[lang]/…
  → loads public/*.js (algorithms-data, videos-data, guide-script, slides-script)
  → optional: fetch Codeforces API (problemset.problems) from the browser
  → optional: localStorage (CF favorites / solved)

Build-time / offline:
  scripts/scrape-videos.cjs + yt-dlp → public/videos-data-{en,es}.js
  slides/<topic>/generate-pngs.cjs + Puppeteer → PNG exports
  scripts/sync-ai-configs.sh → .cursorrules, AGENTS.md, …
```

There is **no application backend**. Persistence is either static files in the repo or browser `localStorage`.

## Pages

| Route | File | Role |
|-------|------|------|
| `/` | `src/pages/index.astro` | Redirect → `/{base}/en/slides` (must include BASE_URL) |
| `/{lang}/guide` | `src/pages/[lang]/guide/index.astro` | Main learning guide (sections) |
| `/{lang}/slides` | `src/pages/[lang]/slides/index.astro` | Intro slide presentation |

`lang` ∈ `{en, es}` via `getStaticPaths()`.

### Guide page sections

Only one `<section class="page-section" data-section="…">` is visible at a time:

| `data-section` | Activated by |
|----------------|--------------|
| `overview` | nav / default |
| `algorithms` | nav |
| `roadmap` | nav |
| `detail` | algorithm card click |
| `tools` | nav |
| `search` | sidebar `search-problems` |
| `videos` | sidebar `watch-videos` |

## Runtime scripts (`public/`)

| File | Role |
|------|------|
| `guide-script.js` | Sidebar, section switching, CF search, video library UI |
| `slides-script.js` | Slide navigation, fullscreen, swipe, keyboard |
| `algorithms-data-{lang}.js` | Topic content global `algorithmsData` + `sidebarSections` |
| `videos-data-{lang}.js` | Video library global `videosData` (scraper output) |

Scripts are loaded with `is:inline` **and** a `BASE_URL` prefix. Translations are injected via `define:vars` into `window.__CP_T__` / `window.__CP_LANG__`.

## Critical constraints

### BASE_URL

`astro.config.mjs` must keep:

```js
site: 'https://electricpants01.github.io',
base: '/competitive-programming-study',
output: 'static',
```

Every internal `href`, script `src`, and `Astro.redirect()` must account for `import.meta.env.BASE_URL`. See [11-deployment.md](./11-deployment.md) and ADR-0003.

### Astro CSS scoping

Scoped `<style>` does not apply to JS-created DOM. Use `<style is:global>` for sidebar items, algo cards, `.cf-*`, `.vl-*`, and slide animatable children. See ADR-0004.

### i18n

Custom TypeScript i18n (not Astro built-in). Explicit `Translations` interface — never `as const` on locale objects. See [08-i18n.md](./08-i18n.md) and ADR-0002.

## Folder layout (intended)

```
src/
  i18n/                 # types, en, es, utils
  pages/
    index.astro
    [lang]/guide/
    [lang]/slides/
  components/           # reusable .astro (create as needed)
  content/              # markdown learning content

public/                 # static assets + client JS + data globals
scripts/                # scrapers + AI sync
slides/<topic>/         # HTML teaching decks + PNG pipeline
AI/                     # agent rules / skills / personas
spec/                   # this documentation
```

## Data flow summary

| Concern | Source of truth | Consumer |
|---------|-----------------|----------|
| UI strings | `src/i18n/en.ts`, `es.ts` | Astro templates + `window.__CP_T__` |
| Algorithm topics | `public/algorithms-data-{lang}.js` | `guide-script.js` |
| Videos | scraper → `public/videos-data-{lang}.js` | `initVideoSearch()` |
| CF problems | Codeforces HTTP API (runtime) | `initCfSearch()` |
| Favorites / solved | `localStorage` | `initCfSearch()` |
| Slide deck copy | `t.slides` in i18n | slides page + `slides-script.js` |
