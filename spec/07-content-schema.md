# 07 — Content Schema

Canonical skill reference: `AI/skills/algorithms-data.md`.

## Files

```
public/algorithms-data-en.js
public/algorithms-data-es.js
```

Each exports `algorithmsData` and `sidebarSections`. Topic IDs must match across locales.

## Topic object

See [04-data-contracts.md](./04-data-contracts.md) for the full TypeScript-ish shape.

### Content checklist (per topic)

- [ ] `description` — 2–4 sentences
- [ ] `asciiArt` — helpful visual
- [ ] `keyTechniques` — important variants
- [ ] ≥ 2 `examples` with working C++ (or noted Python)
- [ ] `bestPractices` includes at least one pitfall
- [ ] `problems` includes CF and LeetCode when possible
- [ ] `quiz` — 5–8 questions, 4 options each, 0-indexed `answer`
- [ ] EN and ES updated together

## Sidebar sections (current)

| Label | Topics |
|-------|--------|
| OVERVIEW | introduction, learning-path, assessment |
| FUNDAMENTALS | complexity-analysis, arrays-strings, stl-guide |
| ALGORITHMS | two-pointers, sliding-window, binary-search, sorting |
| GRAPH THEORY | bfs, dfs, dijkstra, union-find |
| DYNAMIC PROGRAMMING | dp-1d, dp-2d, knapsack, bitmask-dp |
| TREES & ADVANCED | segment-tree, fenwick-tree, trie |
| MATHEMATICS | modular-arithmetic, sieve, combinatorics |
| PRACTICE | search-problems, watch-videos (UI sections, not topic objects) |

Guide-script `sidebarSectionDefs` is the runtime sidebar for PRACTICE items; algorithms data drives topic panels.

## Code example conventions

- Prefer C++17
- Template literals; escape inner backticks
- Comments explain *why*
- Complexity note when non-obvious

## Translation rules (EN → ES)

Translate UI-facing strings and quiz text. Do **not** translate topic IDs, C++ code, or complexity notation.

## Known gaps (track in tickets)

| Topic | Missing advanced example |
|-------|--------------------------|
| `bitmask-dp` | SOS DP + submask enumeration |
| `segment-tree` | Lazy propagation |
| `modular-arithmetic` | Extended Euclidean + linear inverse precompute |
| `sieve` | Linear sieve + totient |
| `combinatorics` | Catalan + derangements |

Also: merge duplicate `examples` key in `bitmask-dp` if still present.
