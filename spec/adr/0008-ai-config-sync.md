# ADR 0008 — AI-agnostic config in `AI/` with sync

## Status

Accepted

## Context

Multiple AI tools (Cursor, Codex, Copilot, Claude, Gemini) need the same project rules. Duplicating docs per tool drifts quickly.

## Decision

- Author rules/agents/skills under `AI/`
- Generate tool-specific files via `scripts/sync-ai-configs.sh` (`make sync-ai`)
- Treat generated files (e.g. `.cursorrules`, `AGENTS.md`) as read-only outputs

## Alternatives considered

- Maintain only `.cursorrules` — excludes other tools
- Symlinks — poor Windows / review UX

## Consequences

- Edit `AI/`, then sync
- Spec (`spec/`) remains the product SSoT; `AI/` is agent operating guidance (skills may overlap with spec and should stay consistent)
