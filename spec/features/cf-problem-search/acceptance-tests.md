# CF Problem Search — Acceptance Tests

## Scenario: Search by tag and rating
Given I open the search section
When I select tag `dp`, set rating 1200–1600, AND mode, and click Search
Then I see only problems with rating in range that include `dp`
And the count label updates

## Scenario: OR combine
Given tags `dp` and `greedy` with OR mode
When I search
Then problems matching either tag appear

## Scenario: Pagination
Given more than 20 filtered problems
When I go to page 2
Then a different slice of 20 is shown

## Scenario: Favorite persists
When I star a problem
Then it appears under Favorites after reload
Even without running a new search

## Scenario: Solved badge
When I mark a problem solved
Then the card shows the solved badge and persists after reload

## Scenario: Legacy favorites migration
Given `cp-cf-favorites` is a JSON array
When the page initializes
Then favorites reset to empty object and the bad key is removed

## Scenario: API failure with retry
Given the Codeforces API is unreachable
When I search
Then the status shows the localized error message and a Retry button
When the API recovers and I click Retry
Then results load successfully
