# Skill: Code Style

## TypeScript / JavaScript

- Use `const` by default; use `let` only when reassignment is needed; never use `var`
- Prefer `async/await` over `.then()` chains
- Use explicit return types on exported functions
- Use named exports over default exports (easier to refactor and grep)
- Avoid `any` — use `unknown` and narrow the type when needed

```ts
// ✅ Good
export async function fetchProblem(id: string): Promise<Problem> { ... }

// ❌ Avoid
export default async function(id) { ... }
```

## Astro Components

- Keep component logic minimal — extract complex logic to utility files in `src/lib/`
- Use `---` frontmatter for data fetching and props, keep template clean
- Name components with PascalCase (`ProblemCard.astro`, not `problem-card.astro`)

## CSS

- Use CSS custom properties (`--color-primary`) for theme values
- Use scoped `<style>` blocks for elements that are part of the static Astro template
- **Use `<style is:global>`** when styles must apply to elements created dynamically by JavaScript —
  Astro's scoped styles add a `data-astro-cid-*` attribute to template elements only; JS-injected
  elements never receive it, so scoped rules won't apply to them
- Use semantic class names that describe purpose, not appearance

## General

- Max line length: 100 characters
- Use 2-space indentation
- Always handle error cases — no silent failures
- Delete commented-out code before committing