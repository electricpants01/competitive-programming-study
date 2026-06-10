# competitive-programming-learnings

A competitive programming learning platform built with [Astro](https://astro.build).

---

## AI Configuration

This project uses an **AI-agnostic** configuration system. All agent definitions, skills, and rules live in the `AI/` folder. A sync script generates tool-specific config files from that single source.

### Structure

```
AI/
├── rules/          ← universal rules (applied to all AI tools)
├── agents/         ← agent personas (code reviewer, debugger, architect...)
└── skills/         ← reusable skill definitions (git workflow, code style...)
```

### Sync to AI tools

After editing any file in `AI/`, run:

```bash
make sync-ai
# or
bash scripts/sync-ai-configs.sh
```

This generates:

| AI Tool | Output file |
|---|---|
| Cline / Claude | `.claude/CLAUDE.md` |
| Gemini CLI | `.gemini/GEMINI.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Cursor | `.cursorrules` |
| OpenAI Codex | `AGENTS.md` |

> **Edit `AI/` — never edit the generated files directly.**

---

## Development

```bash
npm install
npm run dev