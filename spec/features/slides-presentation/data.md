# Slides Presentation — Data

## Source

`src/i18n/en.ts` / `es.ts` → `slides` key:

```ts
slides: {
  brand, prev, next, fullscreenEnter, fullscreenExit, slideOf, guideLink,
  items: Slide[],
}
```

Types: `Slide`, `SlideItem`, `SlideStat` in `types.ts`.

## CTA href rule

`ctaHref` is relative to `` `${base}${lang}/` `` — use `guide`, never `../guide`.
