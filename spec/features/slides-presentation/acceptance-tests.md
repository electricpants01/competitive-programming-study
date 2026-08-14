# Slides Presentation — Acceptance Tests

## Scenario: First load shows title slide
Given I open `/{base}en/slides`
Then the first slide is visible
And dots render for each slide

## Scenario: Next / Prev
When I press Next (or →)
Then the next slide enters from the right
When I press Prev (or ←)
Then the previous slide enters from the left

## Scenario: Keyboard hint once per session
Given `cp_hint_seen` is unset
When I load slides
Then the hint appears and disappears after ~3.5s
And it does not show again in the same session

## Scenario: CTA to guide
Given a CTA slide with `ctaHref: 'guide'`
When I activate the CTA
Then I navigate to `/{base}{lang}/guide`

## Scenario: Language switch
When I switch to ES
Then slide copy is Spanish and navigation still works
