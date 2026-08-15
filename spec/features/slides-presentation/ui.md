# Slides Presentation — UI

## Chrome

Uses the same design tokens as the Guide (ADR-0009): black surface header, Pixel/Mono fonts, white primary controls. Slide content gradients may remain dramatic dark; borders/buttons align with alg0.

## Route

```
/{base}{lang}/slides
```

## Chrome

- Brand / guide link
- Prev / Next
- Fullscreen toggle (distinct expand vs compress icons)
- Slide counter (`slideOf`)
- Dot navigation (`#slideDots`)
- One-time keyboard hint toast (`sessionStorage` key `cp_hint_seen`); copy from `t.slides.keyboardHint`

## Slide types

| Type | Use |
|------|-----|
| `title` | Hero + optional stats |
| `definition` | Quote + icon grid |
| `grid` | 2–3 column cards |
| `list` | Icon rows |
| `timeline` | Numbered steps |
| `cta` | CTA button + cards |

## Motion rules

- Do **not** put `transition` / `opacity` / `transform` on `.slide` in CSS
- JS `goTo(index, direction)` sets inline transitions
- Stagger children with `item-animated` + incremental delay
- All CSS in `<style is:global>`

## Touch

Horizontal swipe > 50px → next/prev.

## Responsive

≤ 480px: hide guide link text via `.link-label`.
