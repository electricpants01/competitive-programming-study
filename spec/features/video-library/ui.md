# Video Library — UI

## Activation

Sidebar `watch-videos` → `setView('videos')`.

## Chrome

alg0 tokens: cards `--subtle` + hairline border; channel/tag pills match CF pills; open links use `--accent` or foreground hover.

## Layout

```
Title / subtitle
[ All Channels ] [Channel A] [Channel B] …

[ keyword search input ]

Tags: [pill]…  [Clear]

┌ thumb+duration │ title
│                │ channel · tags · match count
│                │ segment chips (▶ Watch at mm:ss — text)
└────────────────┴────────────────────────────
```

## Filter logic

1. Channel (`''` = all)
2. Tags — OR across selected
3. Query — title or any segment text (case-insensitive)

Up to 5 matching segments per card.

## CSS

`.vl-*` in `<style is:global>`.
