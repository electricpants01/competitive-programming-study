# CF Problem Search — Data

## API

`GET https://codeforces.com/api/problemset.problems`  
Keep problems with `rating` only.

## State (`cfState`)

```
selectedTags, combineMode ('and'|'or'),
minRating (default 800), maxRating (default 2000),
allProblems, filtered, sortMode ('rating'|'rating-desc'|'id'),
page, favoritesData, solved, activeTab ('search'|'favs')
```

## localStorage

| Key | Shape |
|-----|-------|
| `cp-cf-favorites` | `{ [contestId-index]: problemSnapshot }` |
| `cp-cf-solved` | `string[]` |

Legacy favorites array → reset.

## Filter logic

1. Rating range
2. Tags: none → pass; `and` → all; `or` → any
3. Sort by mode

## i18n

All keys under `t.search.*` (see skill doc for full table).
