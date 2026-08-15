# 09 — Frontend Structure

## Goals

- Keep Astro pages thin; put interactivity in `public/*.js`.
- Keep locale strings in `src/i18n/`.
- Keep generated / large data out of the Astro bundle when possible (plain JS globals).

## Layout

```
src/
  i18n/
  pages/
    index.astro
    [lang]/
      guide/index.astro
      slides/index.astro
  components/          # shared .astro components
  content/             # markdown (problems, tutorials)

public/
  guide-script.js
  slides-script.js
  algorithms-data-en.js
  algorithms-data-es.js
  videos-data-en.js
  videos-data-es.js
  icpc-prelims-data.js
  icpc-prelims/            # vendored ICPC prelim/qualifier PDFs
  icpc-regionals-data.js
  icpc-regionals/          # vendored ICPC regional finals PDFs
  favicon.*
```

## Conventions

| Concern | Convention |
|---------|------------|
| New page | Under `[lang]/` with `getStaticPaths`; always compute `base` |
| New interactive UI | Scaffold HTML in Astro; logic in `guide-script.js` (or new `public/` script) |
| Styles for JS DOM | `<style is:global>` |
| Styles for static template only | scoped `<style>` OK |
| Scripts from `public/` | `is:inline` + `${base}…` |
| Server → client data | `define:vars` |

## Adding a guide section

1. Add `<section class="page-section" data-section="…">` in guide `index.astro`.
2. Wire activation in `guide-script.js` (nav or sidebar).
3. Add i18n strings.
4. Add global CSS for any JS-built nodes.
5. Document under `spec/features/…`.

## Adding a topic

1. Edit both `algorithms-data-*.js`.
2. Add sidebar entries in both files.
3. Follow content checklist in [07-content-schema.md](./07-content-schema.md).

## Feature isolation

Prefer feature-prefixed CSS classes (`.cf-*`, `.vl-*`, `.ip-*`) and init functions (`initCfSearch`, `initVideoSearch`, `initIcpcPrelims`, `initIcpcRegionals`) so sections do not leak state.
