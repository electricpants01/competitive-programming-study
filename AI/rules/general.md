# General Rules

These rules apply to all AI agents working in this project.

## Behavior

- Always ask for clarification before making destructive changes (deleting files, overwriting data).
- Prefer incremental, reviewable changes over large rewrites.
- Write code that is readable and maintainable over clever or terse code.
- When uncertain, explain your reasoning and offer alternatives instead of guessing.

## Code Quality

- Follow the existing code style and conventions of the project.
- Add comments only when the code intent is non-obvious.
- Keep functions small and focused on a single responsibility.
- Avoid introducing new dependencies without justification.

## Communication

- Be concise and direct. Avoid unnecessary preamble.
- When completing a task, summarize what was done and what was intentionally left out.
- Flag potential risks or side effects of proposed changes.

## Security

- Never hardcode secrets, tokens, or passwords.
- Do not log sensitive user data.
- Validate all external inputs.