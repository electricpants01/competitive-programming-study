# ADR 0007 — localStorage for CF favorites and solved

## Status

Accepted

## Context

Learners want to star problems and mark them solved across sessions without accounts.

## Decision

- `cp-cf-favorites`: object map keyed by `contestId-index` storing full problem snapshots
- `cp-cf-solved`: string array of keys
- Migrate legacy favorites `string[]` → reset to `{}`

## Alternatives considered

- Backend user accounts — out of scope
- Favorites as key-only array — cannot render favorites without re-fetching all problems

## Consequences

- Data is device/browser local (no sync)
- Storing full objects enables Favorites tab without a prior search
- Clearing site data wipes progress
