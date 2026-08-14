# 06 — Dev Workflow

## Tooling

- Node.js `>=22.12.0` (nvm path on this machine often `~/.nvm/versions/node/v24.11.0/bin`)
- npm
- Optional: `yt-dlp` (Homebrew) for video scraping
- Optional: Puppeteer (per topic folder) for slide PNGs

## Local commands

```bash
export PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:$PATH"

npm install
npm run dev          # Astro dev server
npm run build        # static build to dist/
npm run preview      # preview with production base path

make sync-ai         # regenerate AI tool configs from AI/
```

Video scrape (requires yt-dlp on PATH):

```bash
PATH="$PATH:/opt/homebrew/bin" node scripts/scrape-videos.cjs es
PATH="$PATH:/opt/homebrew/bin" node scripts/scrape-videos.cjs en
```

## Branching & commits

Conventional Commits:

```
<type>(<scope>): <short description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Branches:

- `main` — production
- `feat/<name>`, `fix/<name>`, `docs/<name>`

Examples:

```
feat(search): add rating-desc sort button
fix(nav): include BASE_URL in root redirect
docs(spec): add video-library feature folder
```

## Pull requests

- Small, single-concern PRs
- Update `spec/` when behavior changes
- Keep EN and ES content/i18n in sync
- Do not commit `dist/`, `node_modules/`, `.env`, secrets

## Code review checklist

- [ ] Spec / AI skill updated if behavior changed
- [ ] BASE_URL used for links, scripts, redirects
- [ ] `<style is:global>` for JS-injected UI
- [ ] i18n keys in `types.ts` + `en.ts` + `es.ts`
- [ ] Algorithms / video data: both locales considered
- [ ] No hardcoded secrets

## Environments

| Env | URL |
|-----|-----|
| Local dev | `http://localhost:4321/competitive-programming-study/` |
| Preview | same after `npm run preview` |
| Production | `https://electricpants01.github.io/competitive-programming-study/` |
