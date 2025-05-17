# Developer Guide: Command Handler

## Overview
The Command Handler module processes direct commands from Cursor (e.g., `/memory`, `/note`, `/plan`) and routes them to the appropriate MCP tools. It acts as the interface between user/agent input and the memory bank's core logic.

## Why It Matters
- Enables seamless user and agent interaction with the memory bank via chat, Command Palette, and automation.
- Centralises command routing for maintainability and extensibility.
- Ensures robust feedback and error handling for all memory operations.

## When to Implement
- **After** the MCP Server and Memory Bank Core are in place.
- Before advanced features like planner tools or custom rules.

## How to Implement
### 1. Define Supported Commands
- `/memory status`, `/memory read`, `/memory update`, `/note`, `/plan`, etc.
- Map each command to a handler function.

### 2. Route Commands to MCP Tools
- Use the MCP server's tool interface to invoke memory bank operations.
- Example:
  ```ts
  if (command === '/memory status') {
    return await mcpClient.call('read-memory-bank-files', {});
  }
  ```

### 3. Provide Robust Feedback
- Return clear, actionable messages for success, errors, or invalid commands.
- Log all command invocations for auditability.

### 4. Modularise Command Logic
- Keep each command handler focused and testable.
- Use async/await for all operations.

## Integration Points
- **MCP Server**: All commands are routed to MCP tools for execution.
- **Memory Bank Core**: Underlying file operations are handled by the core module.
- **Rules Engine**: Enforces safety and consent for sensitive commands.

## Best Practices
- Use idiomatic, modular TypeScript and async/await.
- Validate all command inputs and outputs.
- Provide clear error messages and usage hints.
- Log all actions for transparency and debugging.
- Reference official MCP SDK docs and project rules.

## Troubleshooting
- If commands are unresponsive, check MCP server connection and logs.
- For invalid command errors, review command mapping and handler logic.
- Ensure all required MCP tools are registered and available.

## References
- [TypeScript SDK Quickstart](https://github.com/modelcontextprotocol/typescript-sdk)
- [docs/guides/quickstart.md](../guides/quickstart.md)
- [memory-bank.dev.mdc](../../.cursor/rules/memory-bank.dev.mdc)
- [memory-bank.user.mdc](../../.cursor/rules/memory-bank.user.mdc)

---
*Update this guide as the module evolves. For questions, consult the project rules or use Context7, clear-thought, and codex-keeper for best practices.*
