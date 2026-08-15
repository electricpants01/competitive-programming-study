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
| `editorial` | Optional global editorial data ID; omitted when no editorial exists |

## Dhaka 2025 editorial data

`public/icpc-prelims/editorials/2025-dhaka-online-preli.js` defines
`dhaka2025Editorial`. Its problems are ordered by estimated difficulty and contain:

```js
{
  id, title, difficulty, rating, topics,
  ascii, insight, analysis: string[], complexity
}
```

The browser does not receive solution code. C++17 implementations are kept separately in
`solutions/icpc-dhaka-2025-online-preliminary/`.

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
