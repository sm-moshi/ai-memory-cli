# Developer Guide: Memory Bank Core 🐹

## Overview
The Memory Bank Core module is the foundation of the AI Memory MCP system. It manages all file operations for the modular memory bank (`core/`, `systemPatterns/`, `techContext/`, `progress/`), ensuring robust, async, and self-healing project memory.

## Why It Matters
- Provides persistent, context-aware memory for Cursor and AI workflows.
- Enables modular, automation-ready project context.
- Ensures safety, auditability, and self-healing for all memory operations.

## When to Implement
- **First**: This module underpins all other features (MCP server, CLI, rules, planner).
- Implement before MCP server logic, command handlers, or advanced tools.

## How to Implement
### 1. Use TypeScript and Node.js (20+)
- Leverage async/await for all file IO.
- Use idiomatic, modular TypeScript for maintainability.

### 2. Define File Types and Templates
- Enumerate all supported file types (see `src/core/MemoryBankFileType.ts`).
- Provide default templates for each file (see `src/core/templates.ts`).

### 3. Implement Async File Operations
- Read, write, and self-heal files/folders as needed.
- Use robust error handling and readiness checks.
- Example:
  ```ts
  import { promises as fs } from 'fs';
  await fs.readFile('memory-bank/core/projectbrief.md', 'utf8');
  ```

### 4. Integrate Zod for Validation
- Validate file contents and tool inputs/outputs with Zod schemas.
- Example:
  ```ts
  import { z } from 'zod';
  const ProjectBriefSchema = z.object({ ... });
  ```

### 5. Expose Core Methods
- `getFile`, `updateFile`, `getAllFiles`, `loadFiles`, etc.
- Ensure all methods are async and concurrency-aware.

### 6. Support Chunked File Access
- For large files (>30KB), implement chunked reads (see advanced-features guide).

### 7. Self-Healing Logic
- On init or access, auto-create missing files/folders from templates.
- Log all self-healing actions for auditability.

## Integration Points
- **MCP Tools**: Expose file operations via MCP server (e.g., `read-memory-bank-files`, `get-memory-bank-file`).
- **Rules Engine**: Enforce safety and consent before destructive actions.
- **CLI/Agent**: Provide commands for status, repair, and onboarding.

## Best Practices
- Follow KISS, DRY, and idiomatic TypeScript principles.
- Use async-first, concurrency-aware design.
- Validate all inputs/outputs with Zod.
- Log all actions for transparency and debugging.
- Reference official MCP SDK docs and project rules.

## Troubleshooting
- If files are missing or corrupted, run the self-healing/init command.
- Check logs for errors and self-healing actions.
- For large files, use chunked access to avoid context overload.

## References
- [TypeScript SDK Quickstart](https://github.com/modelcontextprotocol/typescript-sdk)
- [docs/guides/advanced-features.md](../guides/advanced-features.md)
- [memory-bank.dev.mdc](../../.cursor/rules/memory-bank.dev.mdc)
- [memory-bank.user.mdc](../../.cursor/rules/memory-bank.user.mdc)

---
*Update this guide as the module evolves. For questions, consult the project rules or use Context7, clear-thought, and codex-keeper for best practices.*
