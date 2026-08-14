# 05 — Testing Strategy

## Goal

Prefer fewer, high-value tests that verify behavior users care about. A passing suite should increase confidence that the learning site works — not that every line was exercised.

## Layers

### Unit

- Pure helpers (i18n utils, tag matching, filter/sort for CF/video lists if extracted).
- Fast, no network, no DOM when possible.

### Integration

- Guide section switching, sidebar activation.
- CF filter/sort/pagination given fixture problems.
- Video library filter given fixture `videosData`.
- Favorites/solved localStorage read/write + migration guard.

### End-to-end (sparingly)

- Open `/en/guide` and `/es/guide` under base path.
- Switch language and confirm path + visible strings.
- Run a CF search happy path (may mock network).
- Open video library and apply a tag filter.

## Naming

```js
describe('functionName or ComponentName', () => {
  it('should [expected behavior] when [condition]', () => { … });
});
```

## What to test

- ✅ Edge cases (empty input, missing rating, empty segments, legacy favorites array)
- ✅ Error / empty UI states
- ✅ Core filter/sort/pagination logic
- ❌ Third-party library behavior
- ❌ Brittle snapshots of full HTML pages

## Definition of done

- New interactive behavior has at least one automated or documented acceptance scenario.
- Content-only changes (new topic text) are reviewed against the content checklist in [07-content-schema.md](./07-content-schema.md).
- BASE_URL / redirect changes are verified with `npm run build` + `npm run preview`.

## Current state

Automated frontend test runner is not yet a first-class `package.json` script. Until added, treat Gherkin scenarios in `spec/features/*/acceptance-tests.md` as the QA checklist, and verify builds locally before merge.
