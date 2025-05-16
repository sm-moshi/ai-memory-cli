# Developer Guide: MCP Server 🐹

## Overview
The MCP Server module exposes the memory bank and related tools to Cursor and agents via the Model Context Protocol (MCP). It acts as the bridge between the CLI, memory bank core, and Cursor's Command Palette, Output window, and agent workflows.

## Why It Matters
- Enables Cursor and agents to interact with the memory bank via standard MCP tools.
- Provides a robust, extensible interface for commands like `/memory`, `/note`, and `/plan`.
- Ensures modular, automation-ready integration with the rest of the stack.

## When to Implement
- **After** the Memory Bank Core is stable and tested.
- Before implementing advanced tools (planner, rules engine, etc.).

## How to Implement
### 1. Use the TypeScript SDK
- Install `@modelcontextprotocol/sdk` and `zod`.
- Use `McpServer` from the SDK to create the server instance.

### 2. Register Tools and Resources
- Register tools for memory bank operations (e.g., `read-memory-bank-files`, `get-memory-bank-file`, `update-memory-bank-file`).
- Register resources for exposing file contents and metadata.
- Example:
  ```ts
  import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
  import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
  const server = new McpServer({ name: "AI Memory", version: "0.3.0-alpha" });
  // Register tools/resources here
  const transport = new StdioServerTransport();
  await server.connect(transport);
  ```

### 3. Use StdioServerTransport for CLI/Agent Integration
- Prefer stdio transport for CLI-first, agent-compatible operation.
- Avoid HTTP/SSE unless required for legacy support.

### 4. Validate Inputs/Outputs with Zod
- Use Zod schemas for all tool parameters and results.
- Ensure robust error handling and clear feedback.

### 5. Modularise Tool Logic
- Keep each tool/resource handler focused and testable.
- Delegate file operations to the memory bank core module.

## Integration Points
- **Memory Bank Core**: All file operations are delegated to the core module.
- **Command Handler**: Routes `/memory`, `/note`, `/plan` commands to MCP tools.
- **Rules Engine**: Enforces safety and consent for sensitive operations.

## Best Practices
- Use idiomatic, modular TypeScript and async/await.
- Register only the tools/resources needed for your use case.
- Validate all inputs/outputs with Zod.
- Log all actions for auditability and debugging.
- Reference official MCP SDK docs and project rules.

## Troubleshooting
- If the server does not respond, check stdio transport setup and logs.
- Ensure all tools/resources are registered before connecting the server.
- For input/output errors, review Zod schemas and error handling.

## References
- [TypeScript SDK Quickstart](https://github.com/modelcontextprotocol/typescript-sdk)
- [docs/guides/server.md](../guides/server.md)
- [memory-bank.dev.mdc](../../.cursor/rules/memory-bank.dev.mdc)
- [memory-bank.user.mdc](../../.cursor/rules/memory-bank.user.mdc)

---
*Update this guide as the module evolves. For questions, consult the project rules or use Context7, clear-thought, and codex-keeper for best practices.*
