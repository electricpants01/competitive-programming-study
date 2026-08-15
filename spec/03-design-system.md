# 03 — Design System

> Inspired by [alg0.dev](https://www.alg0.dev/). Tokens live as CSS custom properties on `:root` (dark default) and `[data-theme="light"]`. No third-party UI kit. See ADR-0009.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro (`.astro` templates) |
| Client JS | Plain JS in `public/` |
| Styling | CSS custom properties + `<style is:global>` for JS-injected DOM |
| Fonts | Self-hosted Geist Pixel Square + Geist Mono (`public/fonts/*.woff2`) |
| Icons | Inline SVG |

---

## Typography

```css
--font-sans: "Geist Pixel Square", system-ui, -apple-system, sans-serif;
--font-mono: "Geist Mono", ui-monospace, monospace;
--font-heading: var(--font-sans);
```

| Role | Font | Size guidance |
|------|------|---------------|
| UI / labels | Pixel Square | 11–13px; section labels uppercase + wide tracking |
| Headings | Pixel Square | 16–20px, semibold, tight tracking |
| Body | Pixel Square | 13–14px, relaxed line-height |
| Code | Geist Mono | 12–13px |

---

## Color tokens

### Dark (default `:root`)

| Token | Value | Usage |
|---|---|---|
| `--surface` | `#000` | Page / header / sidebar background |
| `--foreground` | `#fff` | Primary text |
| `--muted` | `#737373` | Secondary / placeholder |
| `--muted-strong` | `#a3a3a3` | Hover text |
| `--subtle` | `#ffffff0a` | Elevated panels |
| `--subtle-strong` | `#ffffff14` | Borders, dividers |
| `--subtle-hover` | `#ffffff14` | Row hover bg |
| `--border` | `#ffffff14` | Hairline borders |
| `--accent` | `#38bdf8` | Focus rings, sparse highlights |
| `--action-bg` | `#fff` | Primary buttons |
| `--action-fg` | `#000` | Primary button text |
| `--danger` | `#f87171` | Errors |
| `--success` | `#4ade80` | Solved / correct |

### Light (`[data-theme="light"]`)

Invert surface/foreground; borders/hovers use black alpha; `--action-bg:#171717`, `--action-fg:#fff`; `--accent:#0284c7`.

### Layout

| Token | Value |
|---|---|
| `--header-height` | `48px` |
| `--sidebar-width` | `260px` |
| `--radius-sm` | `6px` |
| `--radius-md` | `10px` |
| `--radius-lg` | `14px` |
| `--transition` | `150ms ease` |

Legacy aliases (optional during migration): `--bg-body` → `--surface`, `--text-primary` → `--foreground`, `--color-primary` → `--action-bg` (or `--accent` for links).

---

## App chrome

### Header (`.site-header`)

- Height 48px, `border-bottom: 1px solid var(--border)`, `background: var(--surface)`
- Left: sidebar toggle, inverted logo tile (white bg / black icon in dark), brand, optional breadcrumb
- Right: search, EN/ES, theme toggle — icon buttons `1.75rem`, muted → hover foreground + subtle bg

### Sidebar (`.site-sidebar`)

- Accordion categories; summary row: 11px uppercase tracking, muted
- Items: 13px, muted; hover lighter + subtle bg; active stronger fg + subtle-strong bg
- Mobile: drawer + backdrop (`bg-black/60`)

### Main (`.site-main` / `#main-content`)

- `flex-1 overflow-auto`; hosts one active **view** at a time

---

## Views

| `data-view` | Content |
|-------------|---------|
| `home` | Centered hero + short CTA + optional topic strip |
| `topic` | Topic detail + quiz (from `algorithmsData`) |
| `search` | CF Problem Search |
| `videos` | Video Library |
| `icpc-prelims` | ICPC prelims |
| `icpc-regionals` | ICPC regionals |

---

## Component patterns

| Pattern | Notes |
|---|---|
| Primary button | White fill / black text (dark); invert in light |
| Tag pills | Border `--border`; `.selected` → action fill |
| Cards / panels | `background: var(--subtle)`; `border: 1px solid var(--border)`; radius-md |
| Code blocks | Mono; dark elevated panel |
| Pagination | Compact icon/text buttons |

**Rule:** styles for JS-injected nodes must be in `<style is:global>`.

---

## Motion

- Header/sidebar: 150ms color/background; active scale `.97` on press
- View swaps: instant show/hide (no slide conflict with practice UIs)
- Slides presentation: keep JS-managed transitions; chrome uses these tokens
