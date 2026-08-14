# Algorithms Content — Acceptance Tests

## Scenario: Topic exists in both locales
Given topic id `binary-search`
When I open it on EN and ES guides
Then both show localized prose and the same code examples

## Scenario: Sidebar completeness
Given `algorithmsData` keys
Then every key appears in exactly one `sidebarSections` item in that file

## Scenario: Quiz answer index
Given a quiz question with `answer: 2`
When the correct option is selected in the UI
Then it matches `options[2]`

## Scenario: Minimum examples
Given any non-overview topic intended for practice
Then it has at least two `examples` entries (track gaps in tickets)
