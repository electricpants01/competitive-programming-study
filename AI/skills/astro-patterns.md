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

**Fix:** Always add `is:inline` to scripts that load files from `public/`:

```astro
<!-- ✅ Correct -->
<script is:inline src="/algorithms-data.js"></script>
<script is:inline src="/guide-script.js"></script>

<!-- ❌ Build error -->
<script src="/algorithms-data.js"></script>
```

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

## Redirect Pages

A bare `.astro` file can act as a redirect with zero markup:

```astro
---
return Astro.redirect('/en/guide', 302);
---
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