# Video Scraper — Data

## Inputs

| File | Role |
|------|------|
| `scripts/video-channels.cjs` | `CHANNELS` + inline `KEYWORD_MAP` |
| `scripts/cp-keywords.cjs` | Extended keyword→tag map |

Channel object:

```js
{ id, name, url, lang: 'es'|'en', playlistEnd: number }
```

## Output

`public/videos-data-{lang}.js` — see [04-data-contracts.md](../../04-data-contracts.md).

## Pipeline

```
channels → yt-dlp flat playlist → per video metadata + VTT
  → parseVTT → tagFromTitle / tagSegments → write file once
```

## 429 policy

Accept empty `segments`; retry off-peak; do not hammer in one session.

## Tag vocabulary

Only tags used in the library UI / CF-adjacent vocabulary (see Content Curator skill). Always add EN and ES keyword variants.
