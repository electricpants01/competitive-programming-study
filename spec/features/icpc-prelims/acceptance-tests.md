# ICPC Prelims — Acceptance Tests

## Scenario: Open from sidebar
Given I am on the guide page
When I click ACM ICPC Prelims in the PRACTICE sidebar section
Then the `icpc-prelims` section is active and contest cards render

## Scenario: Filter by region
When I select region `latin-america`
Then only contests with `region: 'latin-america'` show

## Scenario: Filter by kind
When I select kind Preliminary
Then only contests with `kind: 'preliminary'` show

## Scenario: Open PDF
When I click Open PDF on a card
Then the browser opens `${BASE_URL}icpc-prelims/<file>` in a new tab

## Scenario: Missing data
Given `icpcPrelimsData` is undefined
When I open the section
Then I see the localized no-results message and no JS error

## Scenario: Deep-link
When I visit `?section=icpc-prelims`
Then the prelims section is active and the sidebar item is highlighted
