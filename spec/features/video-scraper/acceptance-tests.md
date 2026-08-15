# Video Scraper — Acceptance Tests

## Scenario: Successful ES run
Given yt-dlp is installed and channels are reachable
When I run `node scripts/scrape-videos.cjs es`
Then `public/videos-data-es.js` is written
And `videosData.videos.length > 0`
And listed channel names match the registry

## Scenario: 429 on subtitles
Given YouTube rate-limits VTT
When the scraper finishes
Then video metadata is still present
And some or all `segments` arrays may be empty

## Scenario: Crash mid-run
Given the process dies before the final write
Then the previous `videos-data-*.js` remains intact

## Scenario: New channel
Given a channel added to `CHANNELS` with `lang: 'en'`
When I re-run the EN scraper
Then that channel appears in `videosData.channels` and contributes videos
