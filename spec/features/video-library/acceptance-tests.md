# Video Library — Acceptance Tests

## Scenario: List videos for locale
Given `videos-data-en.js` is loaded on the EN guide
When I open Watch Videos
Then I see videos and channel filter buttons

## Scenario: Filter by channel
When I select one channel
Then only that channel's videos show

## Scenario: Filter by tag
When I select tag `dp`
Then videos whose `tags` include `dp` show

## Scenario: Keyword hits transcript
Given a video segment contains "segment tree"
When I search that phrase
Then the card shows a match count and deep-link chips

## Scenario: Keyword hits title without transcript
Given a video whose title matches the query but `segments` is empty
When I search that phrase
Then the card shows the localized `noTranscript` message

## Scenario: Missing data file
Given `videosData` is undefined
When I open Watch Videos
Then I see the localized no-results message and no JS error

## Scenario: Tags label is localized
When I open Watch Videos
Then the tags row label shows `t.videos.tagsLabel`
