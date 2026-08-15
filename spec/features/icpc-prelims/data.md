# ICPC Prelims — Data

## Runtime

`window.icpcPrelimsData` from `public/icpc-prelims-data.js`.

```js
{
  regions: [{ id, name }],
  contests: [{
    id, year, region, kind,
    title, file, source, notes?, editorial?
  }]
}
```

| Field | Notes |
|-------|--------|
| `kind` | `preliminary` \| `qualifier` \| `subregional` \| `regional` |
| `file` | Filename under `public/icpc-prelims/` |
| `source` | Upstream URL (attribution / refresh) |
| `editorial` | Key in `window.__CP_ICPC_EDITORIALS__` |

## Editorial data

Each contest loads a script under `public/icpc-prelims/editorials/` that registers:

```js
window.__CP_ICPC_EDITORIALS__ = window.__CP_ICPC_EDITORIALS__ || {};
window.__CP_ICPC_EDITORIALS__.<editorialId> = { contestId, title, difficultyNote, problems: [...] };
```

Problems are ordered easiest → hardest and contain:

```js
{
  id, title, difficulty, rating, topics,
  ascii, insight, analysis: string[], complexity
}
```

**No solution code is shipped to the browser.** C++17 implementations live under `solutions/icpc-*/`.

| Contest | Editorial ID | Solutions folder |
|---------|--------------|------------------|
| Dhaka Online Preli 2025 | `dhaka2025Editorial` | `solutions/icpc-dhaka-2025-online-preliminary/` |
| Fase Zero 2025 | `faseZero2025Editorial` | `solutions/icpc-fase-zero-2025/` |
| Brazil Subregional 2025 (EN+PT) | `brazil2025SubregionalEditorial` | `solutions/icpc-brazil-subregional-2025/` |
| NAQ 2024 | `naq2024Editorial` | `solutions/icpc-naq-2024/` |
| NAQ 2023 | `naq2023Editorial` | `solutions/icpc-naq-2023/` |
| NAQ 2022–23 | `naq2022Editorial` | `solutions/icpc-naq-2022-23/` |
| South Pacific 2024 A | `spp2024AEditorial` | `solutions/icpc-south-pacific-2024-level-a/` |
| South Pacific 2024 B | `spp2024BEditorial` | `solutions/icpc-south-pacific-2024-level-b/` |
| Seoul Nationwide 2024 | `seoul2024NationwideEditorial` | `solutions/icpc-seoul-nationwide-2024/` |
| NTU Team Preli 2024 | `ntu2024Editorial` | `solutions/icpc-ntu-team-preli-2024/` |

## PDF storage

| Path | Role |
|------|------|
| `public/icpc-prelims/*.pdf` | Served assets (GitHub Pages) |
| `spec/features/icpc-prelims/docs/` | Catalog + provenance notes |

PDF href: `${BASE_URL}icpc-prelims/${file}`.

## i18n (`t.icpcPrelims.*`)

Includes catalog labels plus `editorial`, `closeEditorial`, `difficulty`, `keyInsight`,
`solutionAnalysis`, and `complexity`.

## Degradation

If `icpcPrelimsData` missing → show `noResults`, no throw.
If an editorial ID is missing from the registry → hide the Editorial button for that contest.
