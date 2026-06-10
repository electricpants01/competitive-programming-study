# Skill: GitHub Pages Deployment

How to deploy this Astro project to GitHub Pages with a sub-path base URL.

## astro.config.mjs — Required Settings

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://electricpants01.github.io',
  base: '/competitive-programming-study',
  output: 'static',
});
```

- `site` — the full domain (no trailing slash). Used for canonical URLs and `<link rel="alternate">`.
- `base` — the sub-path where the site lives. Astro sets `import.meta.env.BASE_URL` to this value
  (with a trailing slash: `/competitive-programming-study/`).
- `output: 'static'` — required for GitHub Pages (no server-side runtime).

## How BASE_URL Affects Everything

Once `base` is set, **every** internal URL must be prefixed with it. Astro does **not** do this
automatically for you — you must handle it explicitly.

### Pattern for all pages

```astro
---
// Normalise to always have a trailing slash
const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
---
```

### Script src attributes

```astro
<!-- ✅ -->
<script is:inline src={`${base}guide-script.js`}></script>

<!-- ❌ Breaks on GitHub Pages -->
<script is:inline src="/guide-script.js"></script>
```

### Internal navigation links

```astro
<!-- ✅ -->
<a href={`${base}${lang}/guide`}>Guide</a>

<!-- ❌ Breaks on GitHub Pages -->
<a href="/en/guide">Guide</a>
```

### Redirects

```astro
---
// ✅ — strip trailing slash from BASE_URL first
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
return Astro.redirect(`${base}/en/slides`, 302);
---
```

## GitHub Actions Workflow

File: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Manual Step (One-Time Repo Setup)

In the GitHub repository settings:
1. Go to **Settings → Pages**
2. Set **Source** to `GitHub Actions` (not a branch)

After this, every push to `main` automatically deploys the site.

## Verifying the Build Locally

```bash
# Build
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:$PATH" npm run build

# Preview (serves at http://localhost:4321/competitive-programming-study/)
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:$PATH" npm run preview
```

## Checklist When Adding a New Page

When creating a new Astro page in this project, verify:

- [ ] All `<a href>` links use `${base}` prefix
- [ ] All `<script is:inline src>` attributes use `${base}` prefix
- [ ] Any `Astro.redirect()` calls use `${base}` prefix (strip trailing slash first)
- [ ] `getLocalizedUrl()` is used for EN/ES switcher links (it already handles base internally)
- [ ] `hreflang` `<link>` tags are in `<head>` for SEO
- [ ] `getStaticPaths()` is exported if the file is under `[lang]/`