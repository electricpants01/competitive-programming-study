# Guide — UI Specification

## Route

```
/{base}{lang}/guide
```

## Layout

```
┌────────────────────────────────────────────────────────────┐
│ Top nav: brand | Overview Algorithms Roadmap Tools | EN/ES │
├──────────┬─────────────────────────────────────────────────┤
│ Sidebar  │  Active page-section                            │
│ sections │  (overview | algorithms | roadmap | detail |    │
│ + items  │   tools | search | videos)                      │
│          │                                                 │
└──────────┴─────────────────────────────────────────────────┘
```

## Sidebar

Built from `sidebarSectionDefs` in `guide-script.js` + i18n labels. PRACTICE is last.

| Key | Items |
|-----|-------|
| OVERVIEW | introduction, learning-path, assessment |
| FUNDAMENTALS | complexity-analysis, arrays-strings, stl-guide |
| ALGORITHMS | two-pointers, sliding-window, binary-search, sorting |
| GRAPH_THEORY | bfs, dfs, dijkstra, union-find |
| DYNAMIC_PROGRAMMING | dp-1d, dp-2d, knapsack, bitmask-dp |
| TREES_ADVANCED | segment-tree, fenwick-tree, trie |
| MATHEMATICS | modular-arithmetic, sieve, combinatorics |
| PRACTICE | search-problems, watch-videos |

Active item gets highlight (`.active` / equivalent).

## Sections behaviour

| Section | Content |
|---------|---------|
| overview | Intro / assessment entry |
| algorithms | Topic cards grid |
| roadmap | Learning path visualization |
| detail | Full topic panel from `algorithmsData[id]` |
| tools | Tooling recommendations |
| search | CF Problem Search UI |
| videos | Video Library UI |

## Topic detail

Shows title, meta (difficulty, time, importance), description, ASCII art, techniques, examples (code), best practices, problems, quiz.

## Theme

Toggle sets `data-theme="dark"` on a root element; tokens swap via CSS.

## CSS note

Sidebar items and algo cards created/manipulated by JS → styles in `<style is:global>`.
