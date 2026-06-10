# Skill: Git Workflow

## Commit Messages

Follow Conventional Commits format:

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples:**
```
feat(problems): add binary search tutorial page
fix(nav): correct active link highlight on mobile
docs(readme): update setup instructions
```

## Branching

- `main` — production-ready code only
- `feat/<name>` — new features
- `fix/<name>` — bug fixes
- `docs/<name>` — documentation changes

## Pull Requests

- Keep PRs small and focused on one concern
- Link to the relevant issue if one exists
- Include a brief description of what changed and why
- Request review before merging to `main`

## What NOT to commit

- `.env` files or any secrets
- Build artifacts (`dist/`, `node_modules/`, `.cache/`)
- OS/IDE files (`.DS_Store`, `.vscode/` unless shared config)