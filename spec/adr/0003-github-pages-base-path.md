# ADR 0003 — GitHub Pages with base path

## Status

Accepted

## Context

The site is hosted as a project Pages site under `https://electricpants01.github.io/competitive-programming-study/`, not at the domain root.

## Decision

```js
site: 'https://electricpants01.github.io',
base: '/competitive-programming-study',
```

All internal links, script tags, and redirects must include `BASE_URL`. `getLang` / `getLocalizedUrl` strip the base before parsing the locale segment.

## Alternatives considered

- Custom domain at root — possible later; would still need careful path handling
- Hash routing — poor SEO and shareable paths

## Consequences

- Easy to break production while local root paths "work" in misconfigured setups — always test with `preview`
- `Astro.redirect` must manually prepend base
