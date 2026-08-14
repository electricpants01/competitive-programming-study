# ADR 0006 — yt-dlp video scraper

## Status

Accepted

## Context

The video library needs titles, durations, thumbnails, tags, and optional transcript segments from curated YouTube channels — without a YouTube Data API key in the static site.

## Decision

- Maintain channel registry in `scripts/video-channels.cjs`
- Keyword→tag maps in `video-channels.cjs` + `scripts/cp-keywords.cjs`
- Scrape offline with `scripts/scrape-videos.cjs` using `yt-dlp`
- Write `public/videos-data-{lang}.js` (commit generated output)

## Alternatives considered

- YouTube Data API at runtime — keys, quotas, CORS
- Manual JSON curation — does not scale for transcripts
- Embed-only without metadata — weak search/filter UX

## Consequences

- Requires `yt-dlp` locally for refresh
- Subtitle fetches hit HTTP 429; segments may be empty — metadata still valuable
- Never hand-edit generated data files
