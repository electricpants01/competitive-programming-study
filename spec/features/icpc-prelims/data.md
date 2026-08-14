# ICPC Prelims — Data

## Runtime

`window.icpcPrelimsData` from `public/icpc-prelims-data.js`.

```js
{
  regions: [{ id, name }],
  contests: [{
    id, year, region, kind,
    title, file, source, notes?
  }]
}
```

| Field | Notes |
|-------|--------|
| `kind` | `preliminary` \| `qualifier` \| `subregional` \| `regional` |
| `file` | Filename under `public/icpc-prelims/` |
| `source` | Upstream URL (attribution / refresh) |

## PDF storage

| Path | Role |
|------|------|
| `public/icpc-prelims/*.pdf` | Served assets (GitHub Pages) |
| `spec/features/icpc-prelims/docs/` | Catalog + provenance notes |

PDF href: `${BASE_URL}icpc-prelims/${file}`.

## i18n (`t.icpcPrelims.*`)

`title`, `subtitle`, `regionAll`, `kindAll`, `kindPreliminary`, `kindQualifier`, `kindSubregional`, `kindRegional`, `openPdf`, `download`, `noResults`, `sourceLabel`, `countFound`.

## Degradation

If `icpcPrelimsData` missing → show `noResults`, no throw.
