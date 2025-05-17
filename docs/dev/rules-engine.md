# Developer Guide: Rules Engine

## Overview
The Rules Engine module parses and enforces project rules defined in `.mdc` files (e.g., `memory-bank.dev.mdc`, `memory-bank.user.mdc`). It ensures all memory bank operations follow safety, consent, and best-practice guidelines.

## Why It Matters
- Enforces safety and consent for sensitive operations (e.g., overwrites, deletions).
- Ensures compliance with project and user rules for memory bank management.
- Enables automation and onboarding workflows to be robust and user-friendly.

## When to Implement
- **After** the Memory Bank Core and MCP Server are functional.
- Before advanced automation or planner tools that depend on rule enforcement.

## How to Implement
### 1. Parse .mdc Rule Files
- Read and parse `.mdc` files from `.cursor/rules/`.
- Extract rules for file access, tool usage, safety, and consent.

### 2. Enforce Rules in Operations
- Before any write, update, or delete, check for required consent or safety checks.
- Prompt the user or agent for confirmation if needed.
- Example:
  ```ts
  if (rule.requiresConsent && !userConfirmed) {
    throw new Error('User consent required for this operation.');
  }
  ```

### 3. Integrate with MCP Tools
- Wrap MCP tool handlers with rule checks.
- Log all rule enforcement actions for auditability.

### 4. Modularise Rule Logic
- Keep rule parsing and enforcement separate from business logic.
- Allow for easy updates and new rule types.

## Integration Points
- **Memory Bank Core**: All file operations are checked against rules before execution.
- **MCP Server**: Tool handlers invoke rule checks before performing actions.
- **Command Handler**: Prompts for consent or blocks commands as needed.

## Best Practices
- Use idiomatic, modular TypeScript and async/await.
- Validate all rule files and handle parsing errors gracefully.
- Log all rule enforcement and consent actions.
- Reference official project rules and update as they evolve.

## Troubleshooting
- If operations are blocked, check rule files and consent logic.
- For parsing errors, validate `.mdc` file syntax and structure.
- Ensure all rule checks are up to date with the latest project requirements.

## References
- [memory-bank.dev.mdc](../../.cursor/rules/memory-bank.dev.mdc)
- [memory-bank.user.mdc](../../.cursor/rules/memory-bank.user.mdc)
- [docs/guides/advanced-features.md](../guides/advanced-features.md)

---
*Update this guide as the module evolves. For questions, consult the project rules or use Context7, clear-thought, and codex-keeper for best practices.*
