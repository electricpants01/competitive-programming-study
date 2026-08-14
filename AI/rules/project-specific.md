# Project-Specific Rules

Rules specific to this project that override or extend the general rules.

## Project Context

This is a competitive programming learning platform built with Astro (static site generator).
The site is fully internationalized (EN / ES) and uses a custom i18n system built in TypeScript.
It is deployed to GitHub Pages at `https://electricpants01.github.io/competitive-programming-study/`.

## Tech Stack Conventions

- Framework: Astro (use `.astro` components, not React unless necessary)
- Language: TypeScript preferred over plain JavaScript
- Styling: CSS custom properties for theming; `<style is:global>` when styles must apply to JS-injected elements
- Content: Markdown files for learning content
- Node version: `>=22.12.0` (see `engines` in `package.json`)

## Actual File Structure

```
src/
  i18n/
    types.ts          ← Explicit Translations interface + Slide/SlideItem/SlideStat types
    en.ts             ← English strings implementing Translations
    es.ts             ← Spanish strings implementing Translations
    utils.ts          ← getLang(), useTranslations(), getLocalizedUrl(), stripBase(), isActiveLang()
  pages/
    index.astro       ← Redirect / → /[base]/en/slides  (uses BASE_URL)
    [lang]/
      guide/
        index.astro   ← Main guide page (EN + ES via getStaticPaths)
                         Sections: overview, algorithms, roadmap, detail, tools, search
      slides/
        index.astro   ← Slide presentation page (EN + ES via getStaticPaths)
  components/         ← Reusable .astro components (create here when needed)
  content/            ← Markdown learning content (problems, tutorials)

public/
  algorithms-data-en.js  ← Algorithm data in English (plain JS, loaded is:inline)
  algorithms-data-es.js  ← Algorithm data in Spanish (plain JS, loaded is:inline)
  videos-data-en.js      ← Auto-generated EN video data (do not edit manually)
  videos-data-es.js      ← Auto-generated ES video data (do not edit manually)
  guide-script.js        ← Client-side interactivity for guide (plain JS, loaded is:inline)
  slides-script.js       ← Client-side slide navigation (plain JS, loaded is:inline)
  favicon.ico / .svg

.github/
  workflows/
    deploy.yml        ← GitHub Actions: build + deploy to GitHub Pages on push to main

scripts/
  sync-ai-configs.sh  ← Generates AI tool configs from AI/ sources
  scrape-videos.cjs   ← yt-dlp scraper: fetches video metadata + VTT subtitles
  video-channels.cjs  ← Channel registry (ES + EN) and CP keyword→tag map
  cp-keywords.cjs     ← Extended keyword→tag mappings (imported by scrape-videos.cjs)

AI/
  rules/              ← Universal rules (this file lives here)
  agents/             ← Agent definitions
  skills/             ← Skill guides

spec/                 ← Product/engineering SSoT (overview, ADRs, features)
  README.md
  00-overview.md … 11-deployment.md
  adr/
  features/
  templates/

Makefile              ← Run `make sync-ai` to regenerate AI tool configs
```

## Guide Page Sections

The guide page (`src/pages/[lang]/guide/index.astro`) renders multiple `<section class="page-section" data-section="…">` blocks. Only the active one is visible at a time. Sections:

| `data-section` | Activated by |
|----------------|-------------|
| `overview` | nav link / default |
| `algorithms` | nav link |
| `roadmap` | nav link |
| `detail` | clicking an algorithm card |
| `tools` | nav link |
| `search` | sidebar item `search-problems` (PRACTICE section) |
| `videos` | sidebar item `watch-videos` (PRACTICE section) |

The **search** section hosts the Codeforces Problem Search feature. See `AI/skills/cf-problem-search.md` for full details.
The **videos** section hosts the CP Video Library feature. See `AI/skills/video-library.md` for full details.

## Sidebar Sections

`guide-script.js` defines `sidebarSectionDefs` — the canonical sidebar structure. Section keys map to `t.sidebar.sections[key]` for i18n labels.

| Key | Items |
|-----|-------|
| `OVERVIEW` | introduction, learning-path, assessment |
| `FUNDAMENTALS` | complexity-analysis, arrays-strings, stl-guide |
| `ALGORITHMS` | two-pointers, sliding-window, binary-search, sorting |
| `GRAPH_THEORY` | bfs, dfs, dijkstra, union-find |
| `DYNAMIC_PROGRAMMING` | dp-1d, dp-2d, knapsack, bitmask-dp |
| `TREES_ADVANCED` | segment-tree, fenwick-tree, trie |
| `MATHEMATICS` | modular-arithmetic, sieve, combinatorics |
| `PRACTICE` | search-problems, watch-videos |

The `search-problems` item calls `setActiveSection('search')` instead of opening an algorithm detail panel.

## GitHub Pages Deployment

The site is deployed with a `base` path. **`astro.config.mjs` must always have:**

```js
export default defineConfig({
  site: 'https://electricpants01.github.io',
  base: '/competitive-programming-study',
  // ...
});
```

- `import.meta.env.BASE_URL` resolves to `/competitive-programming-study/` (with trailing slash)
- All internal links, script `src` attributes, and redirects must be prefixed with `BASE_URL`
- See `AI/skills/github-pages-deployment.md` for full details

## i18n Conventions

- Locale routing: `src/pages/[lang]/` — supported langs are `en` and `es`
- Default locale is `en`; root `/` redirects to `/[base]/en/slides`
- Always define a `Translations` interface in `src/i18n/types.ts` — **never** use `as const` on
  translation objects; literal types from `typeof en` will make all other locales fail to compile
- Each locale file (`en.ts`, `es.ts`) implements `Translations` explicitly
- Pass server-side translations to client scripts via `define:vars` in a `<script is:inline>` block:
  ```astro
  <script is:inline define:vars={{ translations: JSON.stringify(t), currentLang: lang }}>
    window.__CP_T__ = JSON.parse(translations);
  </script>
  ```
  Interpolated copy must use **string templates** (`{n}`, `{pct}`, …) — functions are stripped by `JSON.stringify`. Client code formats with `fmt()`.
- The `search` key in `Translations` holds all strings for the Codeforces Problem Search feature (`t.search.*`). See `AI/skills/cf-problem-search.md` for the full key list.
- The `videos` key in `Translations` holds all strings for the CP Video Library feature (`t.videos.*`). See `AI/skills/video-library.md` for the full key list.

## Astro CSS Scoping Rule

- Astro's `<style>` blocks are **scoped** — they add a `data-astro-cid-*` attribute to template
  elements and scope CSS rules to that attribute.
- Elements created **dynamically by JavaScript** at runtime never receive the scoped attribute,
  so scoped CSS rules will not apply to them.
- **Use `<style is:global>`** whenever styles must apply to JS-injected DOM elements (e.g., sidebar
  items, algo cards, modal contents built in client-side scripts).
- Use scoped `<style>` only for elements that are part of the static Astro template.

## Astro Script Rules

- Scripts referencing files in `public/` must use `is:inline` **and** include the `BASE_URL` prefix:
  ```astro
  <!-- ✅ Correct — language-specific data file based on current lang -->
  <script is:inline src={`${base}algorithms-data-${lang}.js`}></script>
  <script is:inline src={`${base}guide-script.js`}></script>
  <script is:inline src={`${base}slides-script.js`}></script>

  <!-- ❌ Will fail at build time (missing is:inline) -->
  <script src="/algorithms-data-en.js"></script>

  <!-- ❌ Works in dev but broken on GitHub Pages (missing base prefix) -->
  <script is:inline src="/algorithms-data-en.js"></script>
  ```
  Where `base` is computed as:
  ```astro
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  ```
- Use `<script is:inline define:vars={{ ... }}>` to pass Astro/server-side data to the client.

## Redirect Rule — Always Include BASE_URL

`Astro.redirect()` does **not** automatically prepend the `base` path. Always do it manually:

```astro
---
// ✅ Correct — works in dev and production
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
return Astro.redirect(`${base}/en/slides`, 302);

// ❌ Wrong — works in dev (no base) but 404 on GitHub Pages
return Astro.redirect('/en/slides', 302);
---
```

## File Organization

- Pages go in `src/pages/`
- Reusable components go in `src/components/`
- Learning content (problems, tutorials) goes in `src/content/`
- Static assets and plain JS scripts go in `public/`
- i18n infrastructure goes in `src/i18n/`

## Competitive Programming Specifics

- Problem solutions should include time and space complexity analysis
- Prefer well-known algorithm names when labeling techniques (e.g., "two pointers", "BFS", "DP")
- Include example inputs/outputs in problem explanations
- Code examples should be in C++ or Python unless otherwise specified