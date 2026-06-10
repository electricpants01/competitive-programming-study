# =============================================================================
# Makefile
# =============================================================================

.PHONY: sync-ai help

## sync-ai: Generate AI tool configs from AI/rules, AI/agents, AI/skills
sync-ai:
	@bash scripts/sync-ai-configs.sh

## help: Show available make targets
help:
	@grep -E '^## ' Makefile | sed 's/## /  /'