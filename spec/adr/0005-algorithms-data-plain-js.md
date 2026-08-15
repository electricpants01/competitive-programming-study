# ADR 0005 — Algorithms data as language-specific plain JS

## Status

Accepted

## Context

Topic content is large (examples, quizzes) and must be selectable by locale without shipping both languages to every page unnecessarily.

## Decision

- Store content in `public/algorithms-data-en.js` and `algorithms-data-es.js`
- Export globals `algorithmsData` and `sidebarSections`
- Load only the file matching the current `lang`

## Alternatives considered

- Markdown/MDX collections — better for prose, weaker for structured quizzes/code blobs we already have
- Single JSON with both langs — larger download
- CMS — overkill

## Consequences

- Manual dual-file updates for every topic change
- Invalid JS syntax breaks the page at runtime — validate carefully
- Orphan topics (missing from sidebar) will not appear in navigation
