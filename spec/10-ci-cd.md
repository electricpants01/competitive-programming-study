# 10 — CI / CD

## Pipeline

File: `.github/workflows/deploy.yml`

Triggers:

- Push to `main`
- `workflow_dispatch`

Jobs:

1. **build** — checkout, setup Node 22, `npm ci`, `npm run build`, upload `dist/` as Pages artifact
2. **deploy** — `actions/deploy-pages` to GitHub Pages environment

Permissions: `contents: read`, `pages: write`, `id-token: write`.

Concurrency: group `pages`, cancel in progress.

## Branch protection (recommended)

- Require PR before merge to `main`
- Optionally require a green build workflow if a separate `ci.yml` is added later

## Local equivalents

```bash
npm ci
npm run build
npm run preview
```

## Notes

- Build must succeed with `base: '/competitive-programming-study'`.
- Missing `videos-data-*.js` does not fail the Astro build (runtime empty state); prefer committing generated data files after scraper runs.
- Do not commit secrets; Pages site is public.
