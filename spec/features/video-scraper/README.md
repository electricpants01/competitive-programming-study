# Video Scraper — Feature Spec

## Summary

Offline Node pipeline that scrapes curated YouTube channels with `yt-dlp`, tags titles/segments via keyword maps, and writes `public/videos-data-{lang}.js` for the Video Library.

Canonical skill: `AI/skills/scraper-maintenance.md`. ADR: [0006](../../adr/0006-video-scraper-ytdlp.md). Curator: `AI/agents/content-curator.md`.

## Goals

- Registry-driven channels (`video-channels.cjs`)
- Bilingual keyword→tag map
- Resilient to subtitle 429s (metadata still written)
- Atomic write at end of successful run

## Non-goals

- Runtime scraping from the static site
- Manual edits to generated `videos-data-*.js`

## Links

- UI: N/A (CLI) — see Video Library for consumer UI
- Data: `data.md`
- Tickets: `tickets.md`
- Acceptance: `acceptance-tests.md`
