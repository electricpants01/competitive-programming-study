# CP Slide Decks — Acceptance Tests

## Scenario: No overflow
Given each HTML slide
When opened at 1920×1080
Then no content is clipped by `overflow: hidden`

## Scenario: PNG generation
When `node generate-pngs.cjs` runs
Then every `.html` produces a `.png` with 0 errors

## Scenario: Global numbering
Then slide-num badges are sequential across the topic

## Scenario: C++ correctness
Given code slides
Then examples compile mentally / as C++17 and match stated output
