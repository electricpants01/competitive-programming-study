# Skill: Scraper Maintenance

How to maintain, run, and extend the `scripts/scrape-videos.cjs` pipeline that generates
the video data files consumed by the CP Video Library.

---

## Files Involved

| File | Role |
|------|------|
| `scripts/scrape-videos.cjs` | Main scraper — fetches playlists + VTT subtitles, writes output |
| `scripts/video-channels.cjs` | Channel registry + inline keyword→tag map |
| `scripts/cp-keywords.cjs` | Extended CP keyword→tag mappings (imported by `scrape-videos.cjs`) |
| `public/videos-data-es.js` | Output: Spanish video data (do not edit manually) |
| `public/videos-data-en.js` | Output: English video data (do not edit manually) |

---

## Running the Scraper

```bash
# Generate ES data file (Spanish channels)
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:/opt/homebrew/bin:$PATH" \
  node scripts/scrape-videos.cjs

# Generate EN data file (English channels)
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:/opt/homebrew/bin:$PATH" \
  node scripts/scrape-videos.cjs en

# Generate both in one run (ES first, then EN)
PATH="/Users/ctorricoavila/.nvm/versions/node/v24.11.0/bin:/opt/homebrew/bin:$PATH" \
  node scripts/scrape-videos.cjs es en
```

The scraper requires `yt-dlp` on `$PATH`. It is installed via Homebrew:

```bash
brew install yt-dlp
# or upgrade
brew upgrade yt-dlp
```

**Always run the full pipeline after editing channels or keywords** — partial runs leave the
data files out of sync with the channel registry.

---

## Output Format

The scraper writes one file per language to `public/`:

```
public/videos-data-es.js   ← const videosData = { channels: [...], videos: [...] };
public/videos-data-en.js   ← const videosData = { channels: [...], videos: [...] };
```

Each file header includes a summary comment:
```js
// Videos: 80 (elsantodel90, pacha2880, Club de Algoritmia ESCOM, Training Camp Argentina)
```

Check this count to verify the run completed successfully (count > 0 per channel).

---

## Handling HTTP 429 (Too Many Requests)

YouTube's subtitle/VTT API rate-limits aggressively. When the scraper hits 429:

```
ERROR: Unable to download video subtitles for 'en': HTTP Error 429: Too Many Requests
⚠️  No subtitles for <video-id>
```

**What still works:** All video metadata (title, thumbnail, duration, tags from title) is fetched
correctly. Only `segments[]` (transcript deep-links) will be empty arrays.

**Recovery strategies:**

1. **Wait and re-run** — YouTube resets the rate limit after a few hours. Run the scraper the
   next morning to get transcripts.

2. **Add a sleep delay** — In `scrape-videos.cjs`, increase the delay between subtitle downloads:
   ```js
   // Current: no delay between subtitle requests
   // Fix: add await sleep(2000) between each video's subtitle fetch
   ```

3. **Run off-peak** — Rate limits are less aggressive early morning (UTC 04:00–08:00).

4. **Accept partial data** — Videos without transcripts still appear in the library and are
   searchable by title and tag. Only the transcript-segment deep-links are missing.

**Do NOT re-run the scraper within the same session** — consecutive runs exhaust the quota faster.

---

## Adding a New Channel

Edit `scripts/video-channels.cjs` and push to the `CHANNELS` array:

```js
{
  id: 'unique-kebab-id',       // used as video.channel field — must be unique
  name: 'Display Name',         // shown in the channel filter UI
  url: 'https://www.youtube.com/@handle',  // channel or playlist URL
  lang: 'es',                   // 'es' or 'en' — determines which data file it goes into
  playlistEnd: 20,              // max videos to scrape (keep ≤ 30 to avoid long runs)
},
```

**Before adding a channel, verify with the Content Curator agent:**
- Is it primarily about competitive programming?
- Does it upload regularly (at least monthly)?
- Is the video quality high enough to recommend to learners?

After adding, re-run the scraper for the affected language:
```bash
node scripts/scrape-videos.cjs es   # or en
```

---

## Removing or Replacing a Channel

1. Delete or comment out the channel object in `CHANNELS` in `video-channels.cjs`
2. Re-run the scraper — the output file will no longer include that channel's videos
3. The channel filter button in the UI is built dynamically from `data.channels`, so it
   disappears automatically

---

## Updating the Keyword→Tag Map

Two sources for keywords:
- **`scripts/video-channels.cjs`** — inline `KEYWORD_MAP` (small, channel-registry-adjacent)
- **`scripts/cp-keywords.cjs`** — extended map imported by the scraper (preferred for new entries)

### Adding a new topic tag

1. Open `scripts/cp-keywords.cjs`
2. Add keywords that map to the new tag:
   ```js
   // existing
   'binary search': ['binary-search'],
   'búsqueda binaria': ['binary-search'],

   // new entry
   'suffix array': ['strings', 'advanced'],
   'arreglo de sufijos': ['strings', 'advanced'],
   ```
3. Re-run the scraper — existing videos will be re-tagged on the next run

### Rules for keyword entries
- **Always add both EN and ES variants** of the keyword
- Map each keyword to an array of 1–3 tags
- Use the same tag strings already present in the UI tag cloud (see `guide-script.js` `CF_TAGS`)
- Prefer specific over generic: `'segment tree'` → `['segment-tree']` not `['data-structures']`

---

## Changing the Number of Videos Per Channel

Edit `playlistEnd` in `video-channels.cjs`:

```js
{ id: 'neetcode', playlistEnd: 50, ... }  // was 20, now fetches 50 most recent
```

**Trade-off:** More videos = longer scrape time + more 429 risk. Keep ≤ 30 per channel unless
the channel has many CP-specific videos worth including.

---

## Scraper Architecture

```
scrape-videos.cjs
  ├── reads CHANNELS from video-channels.cjs
  ├── reads KEYWORD_MAP from video-channels.cjs + cp-keywords.cjs
  ├── for each channel:
  │     ├── yt-dlp --flat-playlist → get video IDs + titles + durations
  │     └── for each video:
  │           ├── yt-dlp --write-auto-sub → download VTT to tmp dir
  │           ├── parseVTT() → extract segments (text + start time)
  │           ├── tagFromTitle() → match keywords in title → tags[]
  │           └── tagSegments() → match keywords in segment text → seg.tags[]
  └── writes public/videos-data-{lang}.js
```

The output file is written **once at the end**, not incrementally. If the scraper crashes
mid-run, the previous file is preserved (the write only happens on success).

---

## Verifying a Run

After the scraper completes, check:

```bash
# Count videos in the output file
node -e "const d=require('./public/videos-data-es.js'); console.log('OK')" 2>&1 || \
  grep '"id"' public/videos-data-es.js | wc -l

# Quick sanity check: first video title
node -e "
const fs = require('fs');
eval(fs.readFileSync('public/videos-data-es.js','utf8'));
console.log('Videos:', videosData.videos.length);
console.log('First:', videosData.videos[0]?.title);
console.log('Channels:', videosData.channels.map(c=>c.name).join(', '));
"
```

Expected output (for ES):
- `Videos:` > 0 (typically 60–100 for 4 channels at `playlistEnd: 20`)
- All 4 channel names listed
- A recognizable Spanish CP video title

---

## Known Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| `videos: 0` in output | Scraper crashed before write, or all channels 429'd before metadata | Re-run; check yt-dlp version |
| Non-CP videos in results | Channel pivoted to opinion/vlog content | Switch to specific playlist URL; or set a lower `playlistEnd` |
| `yt-dlp: command not found` | Not on PATH | `brew install yt-dlp` or use full path `/opt/homebrew/bin/yt-dlp` |
| Segments empty for all videos | 429 rate limit | Wait, then re-run during off-peak hours |
| EN data file missing | Scraper called without `en` arg or crashed | `node scripts/scrape-videos.cjs en` |