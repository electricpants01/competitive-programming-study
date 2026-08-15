# Guide — Acceptance Tests

## Scenario: Dark default
Given I visit `/{base}en/guide` with no `cp-theme` set
Then `data-theme` is `dark`
And the surface background is black

## Scenario: Home hero
Given I open the guide
Then the home view is visible with title and CTA

## Scenario: Open topic from sidebar
When I click `binary-search`
Then the topic view shows that topic’s detail and quiz
And the sidebar item is active

## Scenario: Practice destinations
When I click `search-problems` / `watch-videos` / `icpc-prelims` / `icpc-regionals`
Then the matching practice view is visible

## Scenario: Deep-link topic
Given I visit `?topic=bfs`
Then the topic view opens for BFS

## Scenario: Deep-link section
Given I visit `?section=videos`
Then the videos view is visible

## Scenario: Language switch
When I switch EN ↔ ES
Then path and chrome labels update; BASE_URL preserved

## Scenario: Theme toggle
When I toggle theme
Then light invert tokens apply and persist in `cp-theme`
