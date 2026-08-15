# ICPC Regionals — Acceptance Tests

## Scenario: Open from sidebar
Given I am on the guide page
When I click ACM ICPC Regionals in the PRACTICE sidebar section
Then the `icpc-regionals` section is active and contest cards render
And the Regionals item appears below ACM ICPC Prelims

## Scenario: Filter by region
When I select region `europe-nwerc`
Then only contests with `region: 'europe-nwerc'` show

## Scenario: Open PDF
When I click Open PDF on a card
Then the browser opens `${BASE_URL}icpc-regionals/<file>` in a new tab

## Scenario: Missing data
Given `icpcRegionalsData` is undefined
When I open the section
Then I see the localized no-results message and no JS error

## Scenario: Deep-link
When I visit `?section=icpc-regionals`
Then the regionals section is active and the sidebar item is highlighted

## Scenario: Separation from prelims
Given LatAm Regional 2025 is listed under regionals
When I open Prelims
Then LatAm Regional 2025 is not listed there
