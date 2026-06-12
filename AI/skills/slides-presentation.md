# Skill: Slides Presentation UI

Patterns and rules for the slide presentation page (`src/pages/[lang]/slides/index.astro` + `public/slides-script.js`).

## Architecture

- **Template**: `src/pages/[lang]/slides/index.astro` — static HTML, all CSS in `<style is:global>`
- **Runtime script**: `public/slides-script.js` — loaded with `is:inline`, manages all interactivity
- **Content**: Slide data lives in `src/i18n/en.ts` and `src/i18n/es.ts` under the `slides` key
- **Types**: `Slide`, `SlideItem`, `SlideStat` are defined in `src/i18n/types.ts`

## Slide Types

| Type | Use case |
|------|----------|
| `title` | Opening slide — large gradient heading, subtitle, optional stats row |
| `definition` | Block quote + icon grid below |
| `grid` | 2–3 column card grid |
| `list` | Vertical list of icon + title + desc rows |
| `timeline` | Numbered steps with a vertical connector line |
| `cta` | Centered call-to-action with cards and a primary button |

## CSS Rules

### Transitions — always JS-managed
`.slide` must **not** have `transition`, `opacity`, or `transform` in CSS.
All transitions are set imperatively in `slides-script.js` via inline styles.

```css
/* ✅ Correct */
.slide { position: absolute; inset: 0; display: none; flex-direction: column; … }
.slide.active { display: flex; }

/* ❌ Wrong — CSS transition interferes with JS-managed animation */
.slide { opacity: 0; transform: translateX(40px); transition: opacity .35s, transform .35s; }
```

### Staggered child animations
Child elements (`.grid-card`, `.list-item`, `.timeline-item`, `.stat-item`, `.cta-card`) are
animated in via the `item-animated` class, added by JS with incremental `animation-delay`:

```css
@keyframes itemFadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
.item-animated { animation: itemFadeUp .4s ease both; }
```

JS sets `animationDelay = (i * 70) + 'ms'` per item and toggles the class to restart the animation.

### `<style is:global>` is mandatory
All slide CSS must be in `<style is:global>` — never scoped — because elements like `.grid-card`
are part of the static Astro template but the `item-animated` class is added by JS at runtime.
See `AI/skills/astro-patterns.md` for the full scoping explanation.

## Dot Navigation

Dots are generated at runtime by `slides-script.js` and injected into `#slideDots`:

```html
<!-- In index.astro template -->
<div class="slide-dots" id="slideDots"></div>
```

Active dot morphs from an 8 px circle to a 22 px × 4 px blue pill via CSS transition:

```css
.slide-dot { width: 8px; height: 8px; border-radius: 50%; … transition: width .2s, background .2s; }
.slide-dot.active { background: #60a5fa; width: 22px; border-radius: 4px; }
```

## Directional Transitions

`goTo(index, direction)` accepts `direction`: `1` (forward) or `-1` (backward).

| Direction | Outgoing exits | Incoming enters from |
|-----------|----------------|----------------------|
| `1` (next) | `translateX(-40px)` | `translateX(+40px)` |
| `-1` (prev) | `translateX(+40px)` | `translateX(-40px)` |

Always pass `direction` explicitly when calling `goTo()` from buttons or dots:
```js
prevBtn.addEventListener('click', () => goTo(current - 1, -1));
nextBtn.addEventListener('click', () => goTo(current + 1,  1));
```

## Touch / Swipe Support

`touchstart` + `touchend` listeners with a 50 px horizontal threshold:

```js
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) dx < 0 ? goTo(current + 1, 1) : goTo(current - 1, -1);
}, { passive: true });
```

## Fullscreen Icons

Two distinct SVG paths are required — they must **not** be the same markup:

```js
const ICON_EXPAND   = '<svg …><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5…"/></svg>';  // corners pointing out
const ICON_COMPRESS = '<svg …><path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3…"/></svg>'; // corners pointing in
```

`updateFsIcon(isFs)` sets `fsIcon.innerHTML = isFs ? ICON_COMPRESS : ICON_EXPAND`.

## Keyboard Hint Toast

A one-time toast rendered as `#keyboardHint`. Shown for 3.5 s on first page load per browser
session (stored in `sessionStorage` as `cp_hint_seen`):

```js
if (!sessionStorage.getItem('cp_hint_seen')) {
  hint.classList.add('visible');          // opacity: 0 → 1 via CSS transition
  setTimeout(() => {
    hint.classList.remove('visible');
    sessionStorage.setItem('cp_hint_seen', '1');
  }, 3500);
}
```

## Responsive Nav

On ≤ 480 px, the guide link text is hidden by wrapping it in `.link-label`:

```astro
<a class="nav-brand-link" href={…}>
  📖 <span class="link-label">{s.guideLink}</span>
</a>
```

```css
@media (max-width: 480px) {
  .nav-brand-link .link-label { display: none; }
}
```

## Adding a New Slide Type

1. Add the type literal to `Slide['type']` union in `src/i18n/types.ts`
2. Add the slide data in `src/i18n/en.ts` and `src/i18n/es.ts`
3. Add a new `{slide.type === 'your-type' && (…)}` block in the Astro template
4. Add a background gradient for the new slide index in the `nth-child` rules
5. Ensure animatable children have one of the targeted class names for stagger to work