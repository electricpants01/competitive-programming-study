# ICPC Regionals — Data

## Runtime

`window.icpcRegionalsData` from `public/icpc-regionals-data.js`.

```js
{
  regions: [{ id, name }],
  contests: [{
    id, year, region,
    title, file, source, notes?, editorial?
  }]
}
```

| Field | Notes |
|-------|--------|
| `region` | Stable region id (e.g. `europe-nwerc`, `latin-america`, `asia-seoul`) |
| `file` | Filename under `public/icpc-regionals/` |
| `source` | Upstream URL (attribution / refresh) |
| `editorial` | Optional global editorial data ID |

## PDF storage

| Path | Role |
|------|------|
| `public/icpc-regionals/*.pdf` | Served assets (GitHub Pages) |
| `spec/features/icpc-regionals/docs/` | Catalog + provenance notes |

PDF href: `${BASE_URL}icpc-regionals/${file}`.

## i18n (`t.icpcRegionals.*`)

`title`, `subtitle`, `regionAll`, `openPdf`, `download`, `editorial`, `closeEditorial`,
`noResults`, `sourceLabel`, `countFound`.

## Degradation

If `icpcRegionalsData` missing → show `noResults`, no throw.

## Separation from prelims

Do **not** list the same PDF in both catalogs. Full regional finals belong here;
prelims / online preli / NAQ / sub-regionals / nationwide internet rounds belong in
`icpc-prelims`.
