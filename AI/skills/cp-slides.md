# Skill: CP Slide Deck Creation

How to build a topic slide deck for competitive programming education.
Slides are standalone HTML files at 1920×1080 px, exported to PNG via Puppeteer.

---

## File Structure

```
slides/
  <topic>/                        ← kebab-case topic name (e.g., number-theory)
    NN-subtopic-N.html            ← individual slides
    NN-subtopic-N.png             ← auto-generated PNGs (do not edit manually)
    generate-pngs.cjs             ← Puppeteer screenshot script (must be .cjs)
    node_modules/                 ← local puppeteer install
    package.json                  ← created by npm install puppeteer
    package-lock.json
```

### Naming Convention

| Segment | Rule | Example |
|---------|------|---------|
| `NN` | Two-digit subtopic index, zero-padded | `01`, `07` |
| `subtopic` | kebab-case subtopic name | `gcd-lcm`, `extended-euclidean` |
| `N` | Slide number within subtopic (1-based) | `1`, `4` |

Full example: `03-gcd-lcm-2.html` = subtopic 3, GCD & LCM, slide 2.

---

## HTML Slide Spec

Every slide is a **self-contained HTML file**:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1920">
  <title>...</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1920px; height: 1080px; overflow: hidden;
      background: #0f172a;
      font-family: 'Segoe UI', system-ui, sans-serif;
      color: #e2e8f0;
      display: flex; flex-direction: column;
    }
    /* ... */
  </style>
</head>
<body>
  <div class="header">…</div>
  <div class="content">…</div>
</body>
</html>
```

**Key constraints:**
- Fixed `1920px × 1080px` — **no scroll, no overflow visible**
- `overflow: hidden` on body
- Dark background: `#0f172a` (Tailwind `slate-900`)
- All content must fit within the visible area — size fonts and elements accordingly

---

## Header Pattern

```html
<div class="header">
  <div>
    <div class="header-topic">Subtopic Name · Diapositiva N de Total</div>
    <div class="header-title">Slide Title</div>
  </div>
  <div class="slide-num">Global# / TotalSlides</div>
</div>
```

- `header-topic`: small uppercase label (subtopic + "Diapositiva N de M")
- `header-title`: large bold white slide title
- `slide-num`: global counter badge (e.g., `11 / 26`) — tracks position across the entire topic

---

## Topic Color Palettes

Each subtopic uses a consistent accent color for its header and highlight elements:

| Subtopic Type | Header BG Gradient | Accent Color | Border |
|---------------|-------------------|--------------|--------|
| Primality / Sieve | `#1e3a5f → #1e3a8a` | `#3b82f6` (blue-500) | `#60a5fa` |
| Factorization | `#701a75 → #7c3aed` | `#a855f7` (purple-500) | `#c084fc` |
| GCD / LCM | `#065f46 → #047857` | `#10b981` (emerald-500) | `#34d399` |
| Extended Euclid | `#92400e → #b45309` | `#f59e0b` (amber-500) | `#fbbf24` |
| Modular Arithmetic | `#7e1d5f → #9d174d` | `#ec4899` (pink-500) | `#f9a8d4` |
| Chinese Remainder | `#0c4a6e → #075985` | `#0ea5e9` (sky-500) | `#7dd3fc` |
| Diophantine Eq. | `#1a1a3e → #1e1b4b` | `#818cf8` (indigo-400) | `#a5b4fc` |
| Graph Theory | `#064e3b → #065f46` | `#10b981` (emerald-500) | `#34d399` |
| DP | `#3b0764 → #4c1d95` | `#a78bfa` (violet-400) | `#c4b5fd` |

Feel free to add new rows as new subtopic types are introduced.

---

## Content Layout

Slides use a two-column flex layout inside `.content`:

```css
.content { flex: 1; display: flex; gap: 50px; padding: 36px 60px; }
.left  { flex: 1;   display: flex; flex-direction: column; gap: 20px; }
.right { flex: 0.8; display: flex; flex-direction: column; gap: 20px; }
```

Common flex ratios:
- `1 : 0.8` — code left, annotations right
- `1 : 1` — equal columns (definition + example)
- `1.2 : 0.8` — wider code panel

---

## Slide Types

### 1. Definition / Motivation
- Large formula or statement in a highlighted box
- 2-3 short explanation paragraphs
- Used as **slide 1** of a subtopic

### 2. Algorithm / Step-by-Step
- Numbered steps with `.step` cards (left border accent)
- Trace table or visual walkthrough
- Used as **slide 2** of a subtopic

### 3. Application / Deeper Concept
- Use cases with icon rows
- Side-by-side comparisons (slow vs fast, safe vs unsafe)
- Visual examples (clock for modular, grid for CRT)
- Used as **slide 3** of a subtopic

### 4. C++ Code
- Full code panel (left column, flex: 1.3)
- Annotation cards (right column, flex: 0.7)
- Output box showing expected terminal output
- Complexity summary card
- Always the **last slide** of a subtopic

---

## Code Block Conventions

### macOS-style header

```html
<div class="code-wrap">
  <div class="code-header">
    <div class="dots">
      <div class="dot dot-r"></div>
      <div class="dot dot-y"></div>
      <div class="dot dot-g"></div>
    </div>
    <span class="filename">filename.cpp</span>
  </div>
  <pre>…syntax-highlighted code…</pre>
</div>
```

```css
.code-wrap { background: #0d1117; border-radius: 16px; border: 2px solid #30363d; }
.code-header { background: #161b22; padding: 14px 20px; border-bottom: 1px solid #30363d; display: flex; align-items: center; gap: 10px; }
.dot { width: 14px; height: 14px; border-radius: 50%; }
.dot-r { background: #ff5f57; }
.dot-y { background: #febc2e; }
.dot-g { background: #28c840; }
pre { padding: 20px 26px; font-family: 'Consolas', 'Fira Code', monospace; font-size: 18px; line-height: 1.75; }
```

### Syntax highlighting spans

| Class | Color | Used for |
|-------|-------|----------|
| `.kw` | `#ff7b72` | Keywords (`if`, `while`, `return`, `#include`) |
| `.fn` | `#d2a8ff` | Function names |
| `.tp` | `#79c0ff` | Types (`int`, `long long`, `bool`) |
| `.cm` | `#8b949e` italic | Comments |
| `.nu` | `#a5c261` | Numeric literals |
| `.str` | `#a8ff60` | String literals |

---

## Font Sizes (Guidelines)

| Element | Size |
|---------|------|
| Header topic label | `20px` |
| Header title | `46px` |
| Slide number badge | `18px` |
| Body text / explanations | `18–20px` |
| Large formulas | `26–36px` |
| Code (`pre`) | `18–19px` |
| Table cells | `17–18px` |
| Caption / footnote | `15–17px` |

Keep `line-height: 1.5–1.75` for readability.

---

## PNG Generation

### Script: `generate-pngs.cjs`

Place one copy in each `slides/<topic>/` folder:

```js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SLIDES_DIR = path.join(__dirname);

async function generatePNGs() {
  const files = fs.readdirSync(SLIDES_DIR)
    .filter(f => f.endsWith('.html'))
    .sort();

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  for (const file of files) {
    const htmlPath = path.join(SLIDES_DIR, file);
    const pngPath  = htmlPath.replace(/\.html$/, '.png');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 10000 });
    await new Promise(r => setTimeout(r, 200)); // let CSS settle
    await page.screenshot({ path: pngPath, type: 'png' });
    console.log(`  ✅ ${file} → ${path.basename(pngPath)}`);
  }

  await browser.close();
}

generatePNGs();
```

### Setup and run

```bash
# From inside the slides/<topic>/ folder:
npm install puppeteer         # installs into local node_modules/
node generate-pngs.cjs        # renders all .html → .png
```

### ⚠️ Must use `.cjs` extension

The root `package.json` has `"type": "module"`, which makes `.js` files be treated as ESM.
The script uses `require()` (CommonJS), so it **must** be named `.cjs`.

If you accidentally create it as `.js`, rename it:
```bash
mv generate-pngs.js generate-pngs.cjs
```

### Puppeteer install location

Install **inside the topic folder**, not in the project root — keeps `node_modules/puppeteer`
isolated and avoids polluting the Astro project's dependencies.

---

## Slide Planning Checklist

When starting a new topic, plan the full outline before writing HTML:

- [ ] List all subtopics (typically 5–8 per topic)
- [ ] Assign each subtopic a color palette and slide count (3–4 slides each)
- [ ] Assign global slide numbers across all subtopics
- [ ] Create `slides/<topic>/` directory
- [ ] Write HTML slides subtopic by subtopic
- [ ] Run `node generate-pngs.cjs` to verify all slides render correctly
- [ ] Check that no content is clipped (overflow hidden — adjust font size if needed)

---

## Common Pitfalls

| Problem | Cause | Fix |
|---------|-------|-----|
| Content clipped at bottom | Font too large or too many items | Reduce `font-size` by 1–2px or remove one item |
| `require is not defined` | `.js` file treated as ESM | Rename to `.cjs` |
| PNGs are blank/white | Puppeteer launched before CSS loaded | Add `waitUntil: 'networkidle0'` + 200ms delay |
| Fonts look different from browser | System fonts unavailable in headless | Use web-safe fonts: `'Segoe UI', system-ui, sans-serif` |
| Code runs off right edge | Line too long for 1920px at 18–19px | Break line or reduce `font-size` to `16px` |

---

## Topics Completed

| Folder | Subtopics | Slides | PNGs |
|--------|-----------|--------|------|
| `slides/number-theory/` | 7 (primality, factorization, GCD/LCM, extended Euclid, modular arithmetic, CRT, Diophantine) | 26 | 26 |