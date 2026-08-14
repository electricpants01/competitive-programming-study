# Video Library — Data

## Runtime

`window.videosData` from `public/videos-data-{lang}.js`.

Shape: see [04-data-contracts.md](../../04-data-contracts.md).

## i18n (`t.videos.*`)

Includes `title`, `subtitle`, `searchPlaceholder`, `channelAll`, `tagsLabel`, `clearTags`, `noResults`, `noTranscript`, `watchAt(ts)`, `matchesFound(n)`, `openVideo`, lang badges, etc.

## Degradation

If `videosData` undefined → show `noResults` and return (no throw).
