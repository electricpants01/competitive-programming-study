# Project-Specific Rules

Rules specific to this project that override or extend the general rules.

## Project Context

This is a competitive programming learning platform built with Astro (static site generator).
The site is fully internationalized (EN / ES) and uses a custom i18n system built in TypeScript.

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
    types.ts          ← Explicit Translations interface (single source of truth)
    en.ts             ← English strings implementing Translations
    es.ts             ← Spanish strings implementing Translations
    utils.ts          ← getLang(), useTranslations(), getLocalizedUrl()
  pages/
    index.astro       ← Redirect / → /en/guide
    [lang]/
      guide/
        index.astro   ← Main guide page (EN + ES via getStaticPaths)
  components/         ← Reusable .astro components (create here when needed)
  content/            ← Markdown learning content (problems, tutorials)

public/
  algorithms-data.js  ← Algorithm data (plain JS, loaded is:inline)
  guide-script.js     ← Client-side interactivity (plain JS, loaded is:inline)
  favicon.ico / .svg

scripts/
  sync-ai-configs.sh  ← Generates AI tool configs from AI/ sources

AI/
  rules/              ← Universal rules (this file lives here)
  agents/             ← Agent definitions
  skills/             ← Skill guides

Makefile              ← Run `make sync-ai` to regenerate AI tool configs
```

## i18n Conventions

- Locale routing: `src/pages/[lang]/` — supported langs are `en` and `es`
- Default locale is `en`; root `/` redirects to `/en/guide`
- Always define a `Translations` interface in `src/i18n/types.ts` — **never** use `as const` on
  translation objects; literal types from `typeof en` will make all other locales fail to compile
- Each locale file (`en.ts`, `es.ts`) implements `Translations` explicitly
- Pass server-side translations to client scripts via `define:vars` in a `<script is:inline>` block:
  ```astro
  <script is:inline define:vars={{ translations: JSON.stringify(t), currentLang: lang }}>
    window.__CP_T__ = JSON.parse(translations);
  </script>
  ```

## Astro CSS Scoping Rule

- Astro's `<style>` blocks are **scoped** — they add a `data-astro-cid-*` attribute to template
  elements and scope CSS rules to that attribute.
- Elements created **dynamically by JavaScript** at runtime never receive the scoped attribute,
  so scoped CSS rules will not apply to them.
- **Use `<style is:global>`** whenever styles must apply to JS-injected DOM elements (e.g., sidebar
  items, algo cards, modal contents built in client-side scripts).
- Use scoped `<style>` only for elements that are part of the static Astro template.

## Astro Script Rules

- Scripts referencing files in `public/` must use `is:inline`:
  ```astro
  <!-- ✅ Correct -->
  <script is:inline src="/algorithms-data.js"></script>

  <!-- ❌ Will fail at build time -->
  <script src="/algorithms-data.js"></script>
  ```
- Use `<script is:inline define:vars={{ ... }}>` to pass Astro/server-side data to the client.

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