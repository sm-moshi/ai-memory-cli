# Developer Guide: Planner & Automation Tools 🐹

## Overview
The Planner & Automation Tools module provides advanced features for extracting, updating, and automating project plans and notes. It leverages MCP tools like `update-current-plan` and `append-note`, and integrates with reasoning engines (clear-thought, context7, codex-keeper) for robust, AI-assisted workflows.

## Why It Matters
- Enables AI-driven planning, roadmap updates, and note-taking directly from Cursor or CLI.
- Automates repetitive project management tasks and ensures plans are always up to date.
- Integrates with rules and memory bank for safe, auditable automation.

## When to Implement
- **After** the core memory bank, MCP server, and rules engine are stable.
- When you need advanced planning, automation, or AI-driven workflows.

## How to Implement
### 1. Plan Extraction & Update
- Implement tools to extract plans from `progress/current.md` and `core/activeContext.md`.
- Use `update-current-plan` to write new plans, and `append-note` for timestamped notes.
- Example:
  ```ts
  await mcpClient.call('update-current-plan', { content: '### Next Steps\n- Task A\n- Task B' });
  ```

### 2. Integrate Reasoning Engines
- Use clear-thought for step-by-step planning and validation.
- Use context7 for best practices and code examples.
- Use codex-keeper for documentation search and knowledge base.

### 3. Enforce Rules & Safety
- Check rules before updating plans or notes (e.g., consent for overwrites).
- Log all planning and automation actions for auditability.

### 4. Modularise Planning Logic
- Keep planning, note-taking, and automation logic separate and testable.
- Allow for easy extension with new tools or reasoning engines.

## Integration Points
- **Memory Bank Core**: All plans and notes are stored in modular files.
- **MCP Server**: Exposes planning and note tools for agent/CLI use.
- **Rules Engine**: Ensures all updates follow safety and consent rules.
- **Reasoning Engines**: clear-thought, context7, codex-keeper for advanced planning.

## Best Practices
- Use idiomatic, modular TypeScript and async/await.
- Validate all plan/note updates and log actions.
- Reference official MCP SDK docs and project rules.
- Use reasoning engines for complex or ambiguous planning tasks.

## Troubleshooting
- If plan updates fail, check rule enforcement and file permissions.
- For AI-driven planning errors, review reasoning engine outputs and logs.
- Ensure all planning tools are registered and available in the MCP server.

## References
- [docs/guides/advanced-features.md](../guides/advanced-features.md)
- [memory-bank.dev.mdc](../../.cursor/rules/memory-bank.dev.mdc)
- [memory-bank.user.mdc](../../.cursor/rules/memory-bank.user.mdc)

---
*Update this guide as the module evolves. For questions, consult the project rules or use Context7, clear-thought, and codex-keeper for best practices.*
