# Guide — UI Specification

## Route

```
/{base}{lang}/guide
```

## Layout

```
┌─ header (48px): [≡] [logo] Brand · crumb …… [search] EN|ES [theme] ─┐
├─ sidebar (260px) ─┬─ main (#main-content) ─────────────────────────┤
│ CATEGORY          │  active data-view                              │
│  · item           │  home | topic | search | videos | icpc-*       │
│  · item active    │                                                │
└───────────────────┴────────────────────────────────────────────────┘
```

## Header

- Sidebar toggle (mobile drawer + desktop collapse optional)
- Logo tile (inverted): white square / black mark in dark theme
- Brand link → home view
- Breadcrumb shows current topic or practice label
- Search opens overlay over algorithms
- Lang switcher + theme toggle

## Sidebar

Accordion sections (order):

| Key | Items |
|-----|-------|
| OVERVIEW | introduction, learning-path, assessment |
| FUNDAMENTALS | complexity-analysis, arrays-strings, stl-guide |
| ALGORITHMS | two-pointers, sliding-window, binary-search, sorting |
| GRAPH_THEORY | bfs, dfs, dijkstra, union-find |
| DYNAMIC_PROGRAMMING | dp-1d, dp-2d, knapsack, bitmask-dp |
| TREES_ADVANCED | segment-tree, fenwick-tree, trie |
| MATHEMATICS | modular-arithmetic, sieve, combinatorics |
| PRACTICE | search-problems, watch-videos, icpc-prelims, icpc-regionals |

PRACTICE last. Accordion summaries uppercase 11px tracking.

## Views

| View | Trigger |
|------|---------|
| `home` | Load / brand click |
| `topic` | Sidebar topic id or `?topic=` |
| `search` | `search-problems` |
| `videos` | `watch-videos` |
| `icpc-prelims` / `icpc-regionals` | matching sidebar ids |

## Home

Centered hero: title, one sentence, primary CTA focusing sidebar / first topic. Optional compact topic strip.

## Topic workspace

Full main-pane detail: meta, description, techniques, examples (mono), practices, problems, quiz. Back control returns to home (or previous).

## Theme

Default `data-theme="dark"`. Toggle persists `cp-theme`.
