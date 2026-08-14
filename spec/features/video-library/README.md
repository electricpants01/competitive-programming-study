# CP Video Library — Feature Spec

## Summary

Browse curated YouTube CP videos with channel, tag, and keyword filters. When transcripts exist, show matching segment deep-links.

Canonical skill: `AI/skills/video-library.md`. Data from scraper feature.

## Goals

- Filter by channel / tags / query
- Show duration badge and topic tags
- Deep-link to `youtube.com/watch?v=…&t=…s` for transcript hits
- Graceful empty state if `videosData` missing

## Non-goals

- In-page YouTube player chrome beyond links
- Live YouTube API calls from the browser

## Links

- UI: `ui.md`
- Data: `data.md`
- Tickets: `tickets.md`
- Acceptance: `acceptance-tests.md`
