# Guide — Acceptance Tests

## Scenario: Open guide in English
Given I visit `/{base}en/guide`
When the page loads
Then I see the sidebar and the overview section
And the EN language control is active

## Scenario: Switch to Spanish
Given I am on the English guide
When I click ES
Then the path is under `/es/guide`
And sidebar labels are Spanish

## Scenario: Open a topic from the sidebar
Given I am on the guide
When I click `binary-search`
Then the detail section is visible
And the topic title matches algorithms data for the current lang

## Scenario: Open Practice → Search Problems
Given I am on the guide
When I click `search-problems`
Then the search section is visible
And CF UI controls are shown

## Scenario: Open Practice → Watch Videos
Given I am on the guide
When I click `watch-videos`
Then the videos section is visible

## Scenario: Deep-link to Practice section
Given I visit `/{base}en/guide?section=videos`
When the page loads
Then the videos section is visible
And the watch-videos sidebar item is active

## Scenario: Theme toggle
Given I am on the guide
When I toggle dark mode
Then `[data-theme="dark"]` styles apply
And content remains readable
