# Skill: Astro Patterns & Gotchas

Lessons learned from building this project. Read this before touching `.astro` files.

## CSS Scoping — The #1 Gotcha

Astro's `<style>` blocks are **component-scoped by default**. Astro adds a unique
`data-astro-cid-xxxxxxxx` attribute to every element **in the template** and rewrites all CSS
selectors to include that attribute. This is great for isolation — but it silently breaks styles
for any DOM elements created dynamically by JavaScript.

### When to use `<style>` (scoped)
- Styles for elements written directly in the `.astro` template markup.

### When to use `<style is:global>`
- Styles for elements that JavaScript creates at runtime (e.g., sidebar items, dynamically-rendered
  cards, modal contents injected by `innerHTML`).
- Design system tokens (`:root` CSS variables) — these should always be global.
- Dark mode selectors like `[data-theme="dark"]`.
- Full-page layouts where all styles need to apply globally (e.g., the slides page).

```astro
<!-- ✅ Correct when JS builds the DOM -->
<style is:global>
  .sidebar-item { display: flex; align-items: center; … }
  .algo-card { background: var(--bg-surface); … }
</style>

<!-- ⚠️  Only safe when all targeted elements are in the static template -->
<style>
  .hero-title { font-size: 32px; … }
</style>
```

**Diagnosis:** If a CSS class seems to be ignored and the elements are created by JS, switch to
`<style is:global>`.

---

## Scripts Referencing `public/` Assets

Astro's bundler tries to process all `<script src="…">` tags. If the path points to a file in
`public/`, it will fail at build time with:

> `references an asset in the "public/" directory. Please add the "is:inline" directive`

**Fix:** Always add `is:inline` **and** prefix with `BASE_URL` (required for GitHub Pages):

```astro
---
const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
---

<!-- ✅ Correct — is:inline + base prefix -->
<script is:inline src={`${base}algorithms-data.js`}></script>
<script is:inline src={`${base}guide-script.js`}></script>
<script is:inline src={`${base}slides-script.js`}></script>

<!-- ❌ Build error — missing is:inline -->
<script src="/algorithms-data.js"></script>

<!-- ❌ Works in dev, 404 on GitHub Pages — missing base prefix -->
<script is:inline src="/algorithms-data.js"></script>
```

---

## Redirect Pages — Always Include BASE_URL

`Astro.redirect()` does **not** automatically prepend the `base` from `astro.config.mjs`.
If you omit it, the redirect works in local dev (no base) but produces a 404 on GitHub Pages.

```astro
---
// ✅ Correct — strip trailing slash then prepend base
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
return Astro.redirect(`${base}/en/slides`, 302);
---
```

```astro
---
// ❌ Wrong — redirect target misses the /competitive-programming-study prefix
return Astro.redirect('/en/slides', 302);
---
```

**What happens with the wrong pattern:**
1. User visits `http://localhost:4321/competitive-programming-study`
2. Page redirects to `http://localhost:4321/en/slides` (missing base)
3. 404 — the page actually lives at `/competitive-programming-study/en/slides`

---

## Passing Server-Side Data to Client Scripts (`define:vars`)

To pass Astro/server variables into a client-side `<script>`, use `define:vars`. The script must
also be `is:inline` when using `define:vars` with external-looking patterns.

```astro
---
const t = useTranslations(lang);
---

<script is:inline define:vars={{ translations: JSON.stringify(t), currentLang: lang }}>
  // These are available as regular JS variables:
  window.__CP_T__    = JSON.parse(translations);
  window.__CP_LANG__ = currentLang;
</script>
```

> `define:vars` serializes values via JSON, so functions are not transferable.
> Stringify complex objects and parse on the client side.

---

## Dynamic Route Segments (`getStaticPaths`)

Any file with a `[param]` segment in its path requires `getStaticPaths()` to tell Astro what
values to generate pages for:

```astro
---
import { SUPPORTED_LANGS } from '../../../i18n/utils';
import type { Lang } from '../../../i18n/utils';

export function getStaticPaths() {
  return SUPPORTED_LANGS.map((lang) => ({ params: { lang } }));
}

const { lang } = Astro.params as { lang: Lang };
---
```

Without `getStaticPaths()`, the build will fail for dynamic routes in static output mode.

---

## Translation Data — Relative HREFs

When translation data (in `en.ts` / `es.ts`) contains a path that will be used in a template
link, the path must be **relative to what the template prepends**, not a filesystem relative path.

```ts
// ❌ Wrong — '../guide' traverses up, stripping the lang segment
ctaHref: '../guide',
// Template: `${base}${lang}/${ctaHref}` → `/base/en/../guide` → `/base/guide`

// ✅ Correct — just the segment after lang
ctaHref: 'guide',
// Template: `${base}${lang}/${ctaHref}` → `/base/en/guide`
```

---

## getLocalizedUrl() + BASE_URL

`getLocalizedUrl()` in `utils.ts` must strip the base path before processing the lang segment.
Without `stripBase()`, it would treat the base path segment as the locale.

```ts
// utils.ts — correct implementation
function stripBase(pathname: string): string {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length);
  }
  return pathname;
}

export function getLang(url: URL): Lang {
  const [, first] = stripBase(url.pathname).split('/');
  if (first === 'es') return 'es';
  return 'en';
}

export function getLocalizedUrl(url: URL, targetLang: Lang): string {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
  const parts = stripBase(url.pathname).split('/').filter(Boolean);
  if (SUPPORTED_LANGS.includes(parts[0] as Lang)) {
    parts[0] = targetLang;
  } else {
    parts.unshift(targetLang);
  }
  return base + '/' + parts.join('/') + url.search;
}
```

---

## Running the Build

npm is managed via nvm on this machine. Use the full path if `npm` is not in PATH:

```bash
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:$PATH" npm run build
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:$PATH" npm run dev
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:$PATH" npm run preview
```

Or use the Makefile targets if added.