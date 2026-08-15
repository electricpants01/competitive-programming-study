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

## Scenario: Open Dhaka 2025 editorial
Given the Dhaka 2025 contest card is visible
When I click Editorial
Then a modal lists Problems A–H ordered by estimated difficulty
And every problem has an ASCII visual, insight, analysis, and complexity
And no C++ source code is displayed

## Scenario: Every prelims contest has an editorial
Given the ACM ICPC Prelims section is open
When I look at each contest card
Then every card has an Editorial button
And opening it shows difficulty-sorted problems without C++ source

## Scenario: Brazil EN and PT share editorial
Given both Brazil Sub-Regional EN and PT cards
When I open either Editorial
Then the same shared problem list is shown

## Scenario: Editorial button is conditional
Given a contest has no `editorial` field or missing registry entry
When its card renders
Then it has no Editorial button

## Scenario: Missing data
Given `icpcPrelimsData` is undefined
When I open the section
Then I see the localized no-results message and no JS error

## Scenario: Deep-link
When I visit `?section=icpc-prelims`
Then the prelims section is active and the sidebar item is highlighted
