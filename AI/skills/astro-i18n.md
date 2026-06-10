# Skill: Astro i18n Architecture

The i18n system in this project is a hand-rolled TypeScript solution. Do not replace it with
Astro's built-in i18n — the custom system gives us full type-safety and explicit control.

## File Layout

```
src/i18n/
  types.ts   ← Translations interface (the contract every locale must satisfy)
  en.ts      ← English strings
  es.ts      ← Spanish strings
  utils.ts   ← Runtime helpers
```

## The Golden Rule: Always Use an Explicit Interface

**Never** derive the type from `typeof en` with `as const`:

```ts
// ❌ WRONG — as const makes every string a literal type
export const en = { nav: { brand: 'CP Study Guide' } } as const;
export type Translations = typeof en; // type is { nav: { brand: 'CP Study Guide' } }

// Now es.ts will error: Type '"Guía CP"' is not assignable to type '"CP Study Guide"'
```

**Always** define an explicit interface in `types.ts`:

```ts
// ✅ CORRECT — types.ts
export interface Translations {
  nav: { brand: string; /* … */ };
  /* … */
}

// en.ts
import type { Translations } from './types';
export const en: Translations = { nav: { brand: 'CP Study Guide' } };

// es.ts
import type { Translations } from './types';
export const es: Translations = { nav: { brand: 'Guía CP' } };
```

## utils.ts — Runtime Helpers

```ts
export type Lang = 'en' | 'es';
export const SUPPORTED_LANGS: Lang[] = ['en', 'es'];
export const DEFAULT_LANG: Lang = 'en';

/** Extract the locale from an Astro URL object. */
export function getLang(url: URL): Lang { … }

/** Return the translations object for a given locale. */
export function useTranslations(lang: Lang): Translations { … }

/** Convert the current URL to the equivalent URL in another locale. */
export function getLocalizedUrl(url: URL, targetLang: Lang): string { … }
```

## Astro Page Pattern

```astro
---
import { getLang, useTranslations, getLocalizedUrl, SUPPORTED_LANGS } from '../../../i18n/utils';
import type { Lang } from '../../../i18n/utils';

export function getStaticPaths() {
  return SUPPORTED_LANGS.map((lang) => ({ params: { lang } }));
}

const { lang } = Astro.params as { lang: Lang };
const t = useTranslations(lang);
const enUrl = getLocalizedUrl(Astro.url, 'en');
const esUrl = getLocalizedUrl(Astro.url, 'es');
---
```

## Passing Translations to Client-Side Scripts

Use `define:vars` to inject the translations object into `window` so plain JS scripts can access it:

```astro
<script is:inline define:vars={{ translations: JSON.stringify(t), currentLang: lang }}>
  window.__CP_LANG__ = currentLang;
  window.__CP_T__ = JSON.parse(translations);
</script>
```

Then in `guide-script.js`:

```js
const t = window.__CP_T__;
const lang = window.__CP_LANG__;
```

## Adding a New Language

1. Add the new code (e.g., `'pt'`) to `SUPPORTED_LANGS` in `utils.ts`
2. Add `| 'pt'` to the `Lang` type in `utils.ts`
3. Create `src/i18n/pt.ts` implementing `Translations`
4. Add `'pt'` to the `locales` array in `astro.config.mjs`
5. Update the language switcher in the `.astro` page template

## Language Switcher Pattern (Top Nav)

```astro
<div class="lang-switcher">
  <a class:list={['lang-btn', { active: lang === 'en' }]} href={enUrl} hreflang="en">EN</a>
  <span class="lang-divider"></span>
  <a class:list={['lang-btn', { active: lang === 'es' }]} href={esUrl} hreflang="es">ES</a>
</div>
```

Always add `hreflang` alternate links in `<head>` for SEO:

```astro
<link rel="alternate" hreflang="en" href={new URL(enUrl, Astro.url).href} />
<link rel="alternate" hreflang="es" href={new URL(esUrl, Astro.url).href} />