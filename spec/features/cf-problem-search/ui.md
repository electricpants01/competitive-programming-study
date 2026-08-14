# CF Problem Search — UI

## Activation

Sidebar `search-problems` → `setActiveSection('search')`.

## Layout

```
[ Search | Favorites ]

Tags: [pill][pill]…  [Clear tags]
Rating: [min] [max]   Combine: [AND|OR]   [Search]

Sort: [Rating ↑] [Rating ↓] [ID]
N problems found

┌ problem card ……………… [Open] [Solved] [★] ┐
…

[← Prev] [1] [2] … [Next →]
```

## Behaviour

| Control | Behaviour |
|---------|-----------|
| Tag pills | Toggle `.selected`; contribute to `selectedTags` |
| Clear tags | Deselect all |
| AND / OR | Tag combine mode |
| Search | Fetch **if** `allProblems` empty, then `applyFilterSort` + reset page 1 |
| Sort buttons | Re-sort filtered list; reset page |
| Star | Upsert/delete in `favoritesData` + localStorage (`title` = favorite/unfavorite) |
| Solved | Toggle key in `solved` + localStorage; card `.solved` |
| Favorites tab | `Object.values(favoritesData)` — no API required |
| Pagination | 20 per page; up to 7 page buttons |
| Error + Retry | On API failure, status shows `errorMsg` and a Retry button that clears cache and re-fetches |

## CSS

All `.cf-*` in `<style is:global>` on the guide page.
