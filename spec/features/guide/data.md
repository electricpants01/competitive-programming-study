# Guide — Data

## Sources

| Source | Role |
|--------|------|
| `algorithms-data-{lang}.js` | Topic objects + sidebarSections |
| `window.__CP_T__` | UI strings including `sidebar` |
| `guide-script.js` | `sidebarSectionDefs`, section switching |

## Topic identity

Sidebar item `id` must match `algorithmsData` keys for topic panels.

Practice IDs (`search-problems`, `watch-videos`, `icpc-prelims`) live in the first sidebar section and do not require algorithmsData entries.

## Related

- [07-content-schema.md](../../07-content-schema.md)
- [04-data-contracts.md](../../04-data-contracts.md)
