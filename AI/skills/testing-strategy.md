# Skill: Testing Strategy

## Philosophy

- Test behavior, not implementation details
- A passing test suite should give confidence that the app works, not that the code looks a certain way
- Prefer fewer, high-value tests over many brittle unit tests

## Test Types

### Unit Tests
- For pure functions and utility logic (e.g., algorithm helpers, data transformers)
- Fast, isolated, no external dependencies

### Integration Tests
- For component interactions and data flow
- Verify that pieces work together correctly

### End-to-End Tests
- For critical user journeys (e.g., viewing a problem, navigating between pages)
- Use sparingly — they are slow and flaky if overused

## Naming Convention

```
describe('functionName or ComponentName', () => {
  it('should [expected behavior] when [condition]', () => { ... })
})
```

## What to Test

- ✅ Edge cases (empty input, null, max values)
- ✅ Error handling paths
- ✅ Core business logic
- ❌ Internal implementation details that may change
- ❌ Third-party library behavior

## Coverage

Aim for meaningful coverage of critical paths, not 100% line coverage for its own sake.