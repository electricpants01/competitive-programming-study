# ICPC Prelims — UI

## Activation

Sidebar `icpc-prelims` → `setActiveSection('icpc-prelims')`.  
Deep-link: `?section=icpc-prelims` or `#icpc-prelims`.

## Layout

```
Title / subtitle

[ All regions ] [Asia Dhaka] [South Pacific] …

Kinds: [All] [Preliminary] [Qualifier] [Subregional] [Regional]

┌ year badge │ title
│            │ region · kind · notes
│            │ [ Open PDF ↗ ]  [ Download ]
└────────────┴────────────────────────────
```

## Filter logic

1. Region (`''` = all)
2. Kind (`''` = all)
3. Sort: year desc, then title asc

## CSS

`.ip-*` in `<style is:global>` (cards built by JS).
