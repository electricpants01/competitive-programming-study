# 03 — Design System

> Tokens live as CSS custom properties on `:root` / `[data-theme="dark"]` in the guide and slides Astro pages. No third-party UI kit.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro (`.astro` templates) |
| Client JS | Plain JS in `public/` |
| Styling | CSS custom properties + global/scoped style blocks |
| Icons | Inline SVG / emoji sparingly in content (prefer SVG in chrome) |

---

## Color tokens (guide)

### Light

| Token | Example | Usage |
|---|---|---|
| `--color-primary` | `#2563eb` | Links, active states, primary actions |
| `--color-primary-dark` | `#1d4ed8` | Hover on primary |
| `--color-primary-light` | `#ebf1ff` | Soft highlight backgrounds |
| `--bg-body` | `#eae9df` | Page background (warm paper) |
| `--bg-surface` | `#ffffff` | Cards / panels |
| `--bg-sidebar` | `#f5f4ed` | Sidebar |
| `--bg-nav` | `#ffffff` | Top nav |
| `--bg-code` | `#f0efe6` | Code blocks |
| `--bg-hover` / `--bg-active` | `#dddcd2` / `#e4ecff` | Interactive rows |
| `--text-primary` | `#1a1915` | Body text |
| `--text-secondary` / `--text-muted` | `#64625a` / `#8f8d85` | Secondary copy |
| `--border` | `#d4d3c9` | Dividers |

### Dark (`[data-theme="dark"]`)

Dark theme remaps surface/text/border tokens; primary stays blue-family with adjusted light highlight (`#1e3460`).

### Layout tokens

| Token | Value |
|---|---|
| `--sidebar-width` | `240px` |
| `--nav-height` | `56px` |
| `--radius-sm/md/lg` | `6px` / `10px` / `14px` |
| `--transition` | `200ms ease` |
| `--shadow-sm/md` | soft warm / elevated |

---

## Slides presentation palette

Intro slides use a darker slate canvas (`#0f172a`-family gradients per slide type). Teaching HTML decks in `slides/<topic>/` follow the CP slides skill palettes (blue/purple/emerald/… per subtopic). See `features/cp-slide-decks/`.

---

## Component patterns

| Pattern | Notes |
|---|---|
| Top nav | Brand, section links, EN/ES switcher, theme toggle |
| Sidebar | Section labels + items; active item highlight |
| Page sections | One visible `data-section` at a time |
| Algo cards | Grid of topic cards → open detail |
| Tag pills | `.cf-tag` / `.vl-tag` with `.selected` |
| Problem / video cards | Row layout: meta left, actions right |
| Pagination | Prev / numbered / Next buttons |

**Rule:** styles that target JS-injected nodes must be in `<style is:global>`.

---

## Typography

- Prefer system UI stacks already used in templates (`Segoe UI`, system-ui, sans-serif).
- Code: monospace (`Consolas`, `Fira Code`, system mono).
- Do not introduce Inter/Roboto as a new default without an ADR — preserve the existing warm paper aesthetic of the guide.

---

## Motion

- Guide: short CSS transitions on hover/active (`--transition`).
- Slides presentation: JS-managed opacity/transform; staggered `item-animated` children.
- Avoid CSS `transition` on `.slide` itself (conflicts with JS). See `features/slides-presentation/`.
