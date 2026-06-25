# Skill: Codeforces Problem Search

How the Codeforces Problem Search feature works — architecture, state, localStorage, i18n, and gotchas.

---

## Overview

The search feature lets users filter Codeforces problems by tag(s), rating range, and combine mode (AND / OR). Results are paginated and each problem can be starred (favorited) or marked as solved. Both lists persist across sessions in `localStorage`.

---

## Files Involved

| File | Role |
|------|------|
| `src/pages/[lang]/guide/index.astro` | Static HTML scaffold for the search section + all `.cf-*` CSS in `<style is:global>` |
| `public/guide-script.js` | `initCfSearch()` — all runtime logic |
| `src/i18n/types.ts` | `search` key in `Translations` interface |
| `src/i18n/en.ts` / `es.ts` | English / Spanish strings for `t.search.*` |

---

## Page Section

The section lives in `index.astro` as:

```html
<section class="page-section" data-section="search">
  …
</section>
```

It is activated when the user clicks the **Search Problems** sidebar item (`id: 'search-problems'` in the `PRACTICE` sidebar section). `handleSidebarItemClick('search-problems')` calls `setActiveSection('search')`.

---

## Sidebar Entry

```js
// in guide-script.js → sidebarSectionDefs
{ key: 'PRACTICE', items: ['search-problems'] }
```

Sidebar label comes from `t.sidebar.sections.PRACTICE`.  
Item label comes from `t.sidebar.items['search-problems']`.

---

## i18n Keys (`t.search.*`)

All strings used by the feature must be defined in `src/i18n/types.ts` under `search` and implemented in both `en.ts` and `es.ts`.

| Key | Type | Purpose |
|-----|------|---------|
| `title` | `string` | Section heading |
| `subtitle` | `string` | Section subheading |
| `searchTab` | `string` | "Search" tab label |
| `favoritesTab` | `string` | "Favorites" tab label |
| `tagsLabel` | `string` | Label above tag cloud |
| `clearTags` | `string` | "Clear tags" button text |
| `difficultyLabel` | `string` | Label above rating inputs |
| `minRating` | `string` | Placeholder for min rating |
| `maxRating` | `string` | Placeholder for max rating |
| `combineModeAnd` | `string` | "AND" toggle label |
| `combineModeOr` | `string` | "OR" toggle label |
| `searchBtn` | `string` | "Search" button text |
| `loading` | `string` | Status message while fetching |
| `errorMsg` | `string` | Status message on API error |
| `sortByRating` | `string` | Sort button label (asc) |
| `sortByRatingDesc` | `string` | Sort button label (desc) |
| `sortById` | `string` | Sort button label (by ID) |
| `problemsFound` | `(n: number) => string` | E.g. "42 problems found" |
| `noResults` | `string` | Empty state message |
| `openProblem` | `string` | "Open ↗" link label |
| `markSolved` | `string` | Mark-solved button label |
| `solvedLabel` | `string` | Badge text when solved |
| `ratingLabel` | `string` | "Rating" prefix in meta row |
| `noFavorites` | `string` | Favorites empty-state message |
| `prevPage` | `string` | "← Prev" pagination button |
| `nextPage` | `string` | "Next →" pagination button |
| `pageOf` | `(page: number, total: number) => string` | E.g. "Page 2 of 10" |

---

## Codeforces API

```
GET https://codeforces.com/api/problemset.problems
```

Returns all problems (no auth required). Response shape:

```json
{
  "status": "OK",
  "result": {
    "problems": [
      {
        "contestId": 1234,
        "index": "A",
        "name": "Problem Name",
        "type": "PROGRAMMING",
        "rating": 1200,
        "tags": ["dp", "greedy"]
      }
    ],
    "problemStatistics": [ … ]
  }
}
```

Only problems **with a `rating` field** are kept (`cfState.allProblems`). Problems without a rating are filtered out.

---

## Runtime State (`cfState`)

```js
const cfState = {
  selectedTags: string[],      // tags currently selected in the cloud
  combineMode: 'and' | 'or',  // how to combine tags
  minRating: number,           // from input (default 800)
  maxRating: number,           // from input (default 2000)
  allProblems: Problem[],      // fetched from CF API (populated on search)
  filtered: Problem[],         // after applyFilterSort()
  sortMode: 'rating' | 'rating-desc' | 'id',
  page: number,                // current pagination page (1-based)
  favoritesData: FavoritesMap, // { [key]: StoredProblem } — see below
  solved: string[],            // array of problem keys
  activeTab: 'search' | 'favs',
};
```

---

## localStorage Schema

### `cp-cf-favorites` — Favorites

Stored as a **plain object** (not an array):

```json
{
  "1234-A": {
    "contestId": 1234,
    "index": "A",
    "name": "Problem Name",
    "rating": 1200,
    "tags": ["dp", "greedy"]
  }
}
```

**Key format:** `"${contestId}-${index}"` — computed by `problemKey(p)`.

> ⚠️ **Old format (pre-migration):** This was previously stored as a `string[]` of keys.
> On startup, if the loaded value is an array, it is reset to `{}` and `localStorage.removeItem` is called.
> This migration runs once and is self-healing.

```js
// Migration guard in initCfSearch()
let _savedFavs = JSON.parse(localStorage.getItem(CF_FAV_KEY) || '{}');
if (Array.isArray(_savedFavs)) {
  _savedFavs = {};
  localStorage.removeItem(CF_FAV_KEY);
}
```

### `cp-cf-solved` — Solved Problems

Stored as a `string[]` of problem keys:

```json
["1234-A", "5678-B"]
```

---

## Favorites Tab Behavior

- `renderFavs()` reads `Object.values(cfState.favoritesData)` directly — **does not depend on `allProblems` being loaded**.
- This means favorites are visible immediately on page load, even without running a search.
- When a problem is starred from search results, the full problem object is stored in `favoritesData`.
- When a problem is unstarred, its key is deleted from `favoritesData`.
- `localStorage` is updated immediately on every star/unstar.

---

## Filter & Sort Logic

`applyFilterSort()` runs after every search and every sort-mode change:

1. **Rating filter:** keep problems where `minRating ≤ p.rating ≤ maxRating`
2. **Tag filter:**
   - If no tags selected → pass all
   - `combineMode = 'and'` → problem must have **all** selected tags
   - `combineMode = 'or'`  → problem must have **at least one** selected tag
3. **Sort:**
   - `rating` → ascending by rating
   - `rating-desc` → descending by rating
   - `id` → by `contestId` then `index` alphabetically

---

## Pagination

- Page size: **20 problems per page**
- Up to 7 page number buttons are shown (centered on current page)
- Prev / Next buttons are disabled at boundaries
- Page resets to 1 on every new search and sort-mode change

---

## Tag Cloud

28 predefined Codeforces tags are rendered as toggle pills:

```
dp, graphs, greedy, implementation, math, binary search, brute force,
constructive algorithms, data structures, dfs and similar, sortings, trees,
strings, number theory, combinatorics, two pointers, bitmasks, shortest paths,
geometry, hashing, divide and conquer, games, flows, probabilities,
matrices, fft, string suffix structures, meet-in-the-middle, dsu
```

Tags are toggled with `.selected` class. "Clear tags" button deselects all.

---

## CSS Classes Reference

| Class | Element | Purpose |
|-------|---------|---------|
| `.cf-tabs` | `div` | Tab bar container |
| `.cf-tab` | `button` | Tab button (`.active` = selected) |
| `.cf-tag-cloud` | `div` | Flex-wrap container for tag pills |
| `.cf-tag` | `button` | Individual tag pill (`.selected` = active) |
| `.cf-clear-btn` | `button` | Clear all selected tags |
| `.cf-filters-row` | `div` | Row holding filter controls |
| `.cf-filter-group` | `div` | One filter control + label |
| `.cf-rating-input` | `input` | Number input for min/max rating |
| `.cf-combine-toggle` | `div` | AND/OR toggle group |
| `.cf-mode-btn` | `button` | AND or OR button (`.active` = selected) |
| `.cf-search-submit` | `button` | Main "Search" button |
| `.cf-status` | `div` | Loading/error status (`.error` = red) |
| `.cf-sort-row` | `div` | Sort buttons row |
| `.cf-sort-btn` | `button` | Individual sort button (`.active` = selected) |
| `.cf-count` | `div` | "N problems found" text |
| `.cf-results-list` | `div` | Flex-column list of problem cards |
| `.cf-problem-card` | `div` | Individual problem row (`.solved` = green left border) |
| `.cf-problem-info` | `div` | Left side: title + meta |
| `.cf-problem-title` | `div` | Problem title text |
| `.cf-problem-meta` | `div` | Tags + rating + solved badge |
| `.cf-problem-tag` | `span` | One tag chip |
| `.cf-problem-rating` | `span` | Rating badge |
| `.cf-problem-solved-badge` | `span` | "✅ Solved" text |
| `.cf-problem-actions` | `div` | Right side: action buttons |
| `.cf-action-btn` | `a` / `button` | Open / Solved / Star button |
| `.cf-action-btn.fav-active` | — | Star button when starred |
| `.cf-action-btn.solved-active` | — | Solved button when marked solved |
| `.cf-pagination` | `div` | Pagination controls |
| `.cf-page-btn` | `button` | Page number / prev / next (`.active` = current) |

All CSS is in `<style is:global>` in `index.astro` — **never** scoped, because action buttons are toggled by JS at runtime.

---

## Known Gotchas

1. **CORS on Codeforces API:** The fetch call works from browsers directly. No proxy is needed. If it fails (e.g. user is behind a strict firewall), the status bar shows `t.search.errorMsg` in red.

2. **Old favorites format:** If a user had favorites saved before the object-format change, the migration guard resets them to `{}` on first load. Old keys (strings) are discarded because problem data cannot be recovered from a key alone.

3. **Favorites outside `allProblems`:** A problem starred in session A may not appear in `allProblems` in session B if the user hasn't run a search. `renderFavs()` always reads from `favoritesData` (localStorage), not from `allProblems`, so this is handled correctly.

4. **Problems without rating:** The CF API returns some problems with no `rating` field (usually very old problems or contest-specific ones). These are filtered out on fetch and never shown.