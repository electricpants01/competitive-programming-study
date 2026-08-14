# Competitive Programming Study — Spec

This folder is the single source of truth for product decisions, architecture, and engineering conventions. Read it before writing code; update it when decisions change.

Companion folder: `AI/` holds agent personas, skills, and rules that sync into tool-specific configs (`make sync-ai`). Spec documents *what* the product is; `AI/` documents *how* agents should work on it.

---

## Core Documents

| # | Document | What it covers |
|---|----------|----------------|
| [00](./00-overview.md) | Overview | Project purpose, users, key capabilities, tech summary |
| [01](./01-architecture.md) | Architecture | Astro static site, pages, public scripts, data pipeline |
| [02](./02-product-requirements.md) | Product Requirements | Learner journeys, functional / non-functional requirements |
| [03](./03-design-system.md) | Design System | CSS tokens, light/dark theme, layout, component patterns |
| [04](./04-data-contracts.md) | Data Contracts | Algorithms data, videos data, Codeforces API, localStorage |
| [05](./05-testing-strategy.md) | Testing Strategy | Unit / integration / E2E philosophy and what to cover |
| [06](./06-dev-workflow.md) | Dev Workflow | Branching, commits, PR process, local commands |
| [07](./07-content-schema.md) | Content Schema | Topic schema, sidebar structure, quiz / example rules |
| [08](./08-i18n.md) | Internationalization | Custom i18n system, locale routing, translation rules |
| [09](./09-frontend-structure.md) | Frontend Structure | `src/` and `public/` layout, conventions, adding features |
| [10](./10-ci-cd.md) | CI / CD | GitHub Actions build + deploy to GitHub Pages |
| [11](./11-deployment.md) | Deployment | GitHub Pages base path, BASE_URL rules, verification |

---

## Architecture Decision Records

ADRs capture *why* a significant choice was made. They are never deleted — only superseded.

| ADR | Title | Status |
|-----|-------|--------|
| [0001](./adr/0001-astro-static-site.md) | Astro static site (no backend) | Accepted |
| [0002](./adr/0002-custom-i18n.md) | Hand-rolled TypeScript i18n | Accepted |
| [0003](./adr/0003-github-pages-base-path.md) | GitHub Pages with `/competitive-programming-study` base | Accepted |
| [0004](./adr/0004-client-side-guide-script.md) | Plain JS guide interactivity in `public/` | Accepted |
| [0005](./adr/0005-algorithms-data-plain-js.md) | Language-specific algorithms data as plain JS globals | Accepted |
| [0006](./adr/0006-video-scraper-ytdlp.md) | yt-dlp scraper for video library metadata + transcripts | Accepted |
| [0007](./adr/0007-localstorage-cf-favorites.md) | localStorage for CF favorites and solved state | Accepted |
| [0008](./adr/0008-ai-config-sync.md) | AI-agnostic config in `AI/` with sync script | Accepted |

---

## Features

Each shipping feature has its own sub-folder under `spec/features/` with these files:

| File | Contents |
|------|----------|
| `README.md` | Feature scope and overview |
| `ui.md` | Screen layouts, component behaviour |
| `data.md` | Data shapes / external APIs specific to this feature |
| `tickets.md` | Implementation / maintenance tickets |
| `acceptance-tests.md` | Gherkin-style acceptance criteria |

| Feature | Folder |
|---------|--------|
| Guide shell (sidebar, sections, topic detail) | [features/guide/](./features/guide/) |
| Slides presentation UI | [features/slides-presentation/](./features/slides-presentation/) |
| Codeforces Problem Search | [features/cf-problem-search/](./features/cf-problem-search/) |
| CP Video Library | [features/video-library/](./features/video-library/) |
| Algorithms content (data + quizzes) | [features/algorithms-content/](./features/algorithms-content/) |
| CP slide decks (HTML → PNG) | [features/cp-slide-decks/](./features/cp-slide-decks/) |
| Video scraper pipeline | [features/video-scraper/](./features/video-scraper/) |

---

## Templates

Use these when creating new ADRs, features, or tickets:

- [`templates/adr-template.md`](./templates/adr-template.md)
- [`templates/feature-template.md`](./templates/feature-template.md)
- [`templates/ticket-template.md`](./templates/ticket-template.md)

---

## Actual Tech Stack (as built)

| Layer | Choice |
|-------|--------|
| Framework | Astro 6 (static output) |
| Language | TypeScript (i18n / pages) + plain JS (`public/` scripts) |
| Styling | CSS custom properties; `<style is:global>` for JS-injected DOM |
| i18n | Custom EN / ES (`src/i18n/`) |
| Content | Markdown + plain JS data files (`algorithms-data-*.js`, `videos-data-*.js`) |
| Scraper | Node CommonJS + `yt-dlp` |
| Deploy | GitHub Actions → GitHub Pages |
| Node | `>=22.12.0` |

---

## Quick-start for a new engineer

```bash
# 1. Install & run
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:$PATH" npm install
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:$PATH" npm run dev

# 2. Open
# http://localhost:4321/competitive-programming-study/

# 3. Build / preview (matches production base path)
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:$PATH" npm run build
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:$PATH" npm run preview

# 4. After editing AI/
make sync-ai
```

Live site: https://electricpants01.github.io/competitive-programming-study/
