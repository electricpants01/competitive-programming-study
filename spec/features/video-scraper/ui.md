# Video Scraper — UI

No end-user UI. Operator interface is CLI:

```bash
PATH="…node…:/opt/homebrew/bin:$PATH" node scripts/scrape-videos.cjs        # ES default
PATH="…node…:/opt/homebrew/bin:$PATH" node scripts/scrape-videos.cjs en
PATH="…node…:/opt/homebrew/bin:$PATH" node scripts/scrape-videos.cjs es en
```

Requires `yt-dlp` on PATH.
