# 11 — Deployment

Canonical skill: `AI/skills/github-pages-deployment.md`. Decision: ADR-0003.

## Target

https://electricpants01.github.io/competitive-programming-study/

## Required Astro config

```js
export default defineConfig({
  site: 'https://electricpants01.github.io',
  base: '/competitive-programming-study',
  output: 'static',
});
```

## BASE_URL rules

`import.meta.env.BASE_URL` → `/competitive-programming-study/` (trailing slash).

### Normalize for links / scripts

```astro
const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
```

### Redirects

`Astro.redirect()` does **not** prepend base automatically:

```astro
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
return Astro.redirect(`${base}/en/slides`, 302);
```

### Checklist for new pages

- [ ] All `<a href>` use `${base}` (or `getLocalizedUrl`)
- [ ] All `public/` scripts use `is:inline` + `${base}`
- [ ] Redirects include base
- [ ] `hreflang` links present
- [ ] `getStaticPaths` if under `[lang]/`

## One-time GitHub settings

Settings → Pages → Source = **GitHub Actions**.

## Verify

```bash
npm run build
npm run preview
# open http://localhost:4321/competitive-programming-study/
```

Confirm root redirect, EN/ES guide, slides, CF search, and videos section under the base path.
