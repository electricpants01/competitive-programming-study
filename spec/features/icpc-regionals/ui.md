# ICPC Regionals — UI

## Activation

Sidebar `icpc-regionals` → `setView('icpc-regionals')`.  
Deep-link: `?section=icpc-regionals` or `#icpc-regionals`.

## Chrome

Same black-canvas tokens as prelims (`.ip-*` / `.ir-*`).

## Layout

```
Title / subtitle

[ All regions ] [Europe NWERC] [Europe SWERC] [Latin America] …

┌ year badge │ title
│            │ region · notes
│            │ [ Open PDF ↗ ]  [ Download ]  [ Editorial? ]
└────────────┴────────────────────────────
```

## Filter logic

1. Region (`''` = all)
2. Sort: year desc, then title asc

## CSS

Reuse `.ip-*` styles from prelims where possible. Prefer `.ir-*` only if regionals need
distinct styling; otherwise share `.ip-*` classes for cards/filters to avoid duplication.

Initial implementation may clone `.ip-*` as `.ir-*` for isolation (same visual language).
