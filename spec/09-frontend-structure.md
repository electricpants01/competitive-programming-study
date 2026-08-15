# 09 — Frontend Structure

## Goals

- Thin Astro pages; interactivity in `public/*.js`
- Locale strings in `src/i18n/`
- Large data as plain JS globals under `public/`
- Design tokens + fonts per [03-design-system.md](./03-design-system.md)

## Layout

```
src/
  i18n/
  pages/
    index.astro
    [lang]/guide/index.astro    # app shell
    [lang]/slides/index.astro
  components/
  content/

public/
  fonts/
    GeistPixel-Square.woff2
    GeistMono-Variable.woff2
  guide-script.js
  slides-script.js
  algorithms-data-{en,es}.js
  videos-data-{en,es}.js
  icpc-prelims-data.js
  icpc-regionals-data.js
  icpc-prelims/  icpc-regionals/
  favicon.*
```

## Guide conventions

| Concern | Convention |
|---------|------------|
| Shell | `.site-app` / `.site-header` / `.site-sidebar` / `#main-content` |
| Views | `[data-view]` children; one active |
| Styles for JS DOM | `<style is:global>` |
| Scripts | `is:inline` + `${base}` |
| Tokens | alg0 names (`--surface`, `--foreground`, …) |

## Adding a practice view

1. Add `[data-view="…"]` panel in guide Astro.
2. Map sidebar id → view in `PRACTICE_ITEM_SECTIONS`.
3. Init function in `guide-script.js`.
4. Global CSS using design tokens.
5. Spec under `spec/features/…`.
