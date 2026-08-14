# ADR 0002 — Hand-rolled TypeScript i18n

## Status

Accepted

## Context

The site must ship EN and ES with compile-time safety. Astro's built-in i18n was less flexible for our explicit key catalogue and client-script injection pattern.

## Decision

- Maintain `Translations` interface in `src/i18n/types.ts`
- Implement `en.ts` / `es.ts` against that interface
- Route via `[lang]` + helpers in `utils.ts` (`stripBase`, `getLocalizedUrl`, …)
- Inject translations into client scripts via `define:vars`

## Alternatives considered

- Astro built-in i18n — rejected for less control over types and client bridge
- `typeof en` + `as const` — causes literal-type breakage for other locales
- JSON locale files — weaker TypeScript checking

## Consequences

- Adding a key requires three file edits (`types`, `en`, `es`)
- Never use `as const` on locale objects for typing
- Client code reads `window.__CP_T__`
