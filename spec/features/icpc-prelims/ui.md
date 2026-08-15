# ICPC Prelims — UI

## Activation

Sidebar `icpc-prelims` (PRACTICE section, first in sidebar) → `setActiveSection('icpc-prelims')`.  
Deep-link: `?section=icpc-prelims` or `#icpc-prelims`.

## Layout

```
Title / subtitle

[ All regions ] [Asia Dhaka] [South Pacific] …

Kinds: [All] [Preliminary] [Qualifier] [Subregional] [Regional]

┌ year badge │ title
│            │ region · kind · notes
│            │ [ Open PDF ↗ ]  [ Download ]  [ Editorial? ]
└────────────┴────────────────────────────
```

`Editorial` appears only when the contest catalog entry has editorial data. For Dhaka 2025 it
opens a modal containing all eight problems sorted from easiest to hardest:

- estimated difficulty and topic tags;
- ASCII visualization;
- key insight;
- numbered solution analysis;
- time and space complexity.

C++ code is intentionally not rendered in the modal.

## Filter logic

1. Region (`''` = all)
2. Kind (`''` = all)
3. Sort: year desc, then title asc

## CSS

`.ip-*` in `<style is:global>` (cards built by JS).
