# Roadmap – AI Memory CLI

_Last updated: 2025-05-18_

---

## Vision

Build a robust, modular, CLI-first (but GUI/agent-friendly) memory bank for Cursor 0.50+ and VS Code, supporting persistent, rules-driven project context, self-healing, template-based onboarding, and seamless migration from legacy memory banks.

---

## Milestones

### 1. Core Architecture & Setup
- [x] Define modular folder structure (`src/core/`, `src/cli/`, `src/mcp/`, `src/http/`, `src/rules/`, `src/types/`, `src/utils/`)
- [x] Establish TypeScript, Node.js, and MCP SDK as core stack
- [x] Set up build system (esbuild), linting, and test harness

### 2. Core Memory Bank Logic
- [x] Implement `memoryBank.ts` (file IO, validation, self-healing, migration)
- [x] Add `templates.ts` for default file/folder content
- [x] Add `validation.ts` (Zod schemas for all file types)
- [x] Add `migration.ts` for legacy/flat file support
- [x] Expose clean, async API via `index.ts`
- [x] Unit tests for all core logic

### 3. CLI & Stdio Agent Integration
- [x] Implement `cli.ts` (argument parsing, command routing)
- [x] Implement `commandRouter.ts` (maps CLI commands to core/MCP actions)
- [x] Implement `stdioServer.ts` (MCP stdio server for Cursor 0.50+)
- [x] Add `prompts.ts` for CLI user messages
- [x] Add `/memory` command support (legacy/agent compatibility)
- [x] CLI integration tests

### 4. MCP Server & Tooling
- [x] Implement `mcpServer.ts` (setup for stdio/HTTP/SSE)
- [x] Implement `toolRegistry.ts` (register tools/resources/prompts)
- [x] Implement `transportManager.ts` (manage transports)
- [x] Add `mcpPrompts.ts` for agent-facing messages
- [x] Add MCP tool aliases for legacy/agent compatibility
- [x] Integration tests for MCP server/tools

### 5. HTTP/SSE Fallback Server
- [x] Implement `httpServer.ts` (legacy HTTP/SSE entrypoint)
- [x] Implement `routes.ts` (define endpoints)
- [x] Implement `sse.ts` (SSE logic)
- [x] HTTP/SSE compatibility tests

### 6. Rules Engine & Consent
- [x] Implement `rulesEngine.ts` (parsing, enforcement, evaluation)
- [x] Implement `mdcParser.ts` (parse `.mdc` files)
- [x] Implement `consent.ts` (user consent logic)
- [x] Add `memory-bank-rules.md` (canonical rules)
- [x] Rules engine integrated at all entrypoints
- [x] Rules engine unit/integration tests

### 7. Types & Utilities
- [x] Implement `types.ts`, `enums.ts`, `assets.d.ts` (core types, enums, asset declarations)
- [x] Implement `logger.ts`, `config.ts`, `helpers.ts` (utilities)
- [x] Ensure type safety and consistency across all modules

### 8. VS Code/Extension Integration
- [ ] Compile as a VS Code extension (Output Window, Command Palette integration)
- [ ] Register extension commands (e.g., "AI Memory: Start Server", "Set Log Level")
- [ ] Ensure seamless Cursor/VS Code agent workflow integration

### 9. Documentation & Onboarding
- [ ] Write and maintain `README.md`, `implementation_plan.md`, and user/developer guides
- [ ] Provide template-based onboarding for new projects
- [ ] Document migration from legacy/flat memory banks

### 10. Future Enhancements
- [ ] Version control integration for memory bank
- [ ] Remote/hosted memory bank support
- [ ] Visualisation tools for memory/context
- [ ] Advanced consent and rules management
- [ ] Community feedback and iteration

---

*This roadmap is reviewed and updated regularly to ensure alignment with project goals, user needs, and best practices.*

---

## Migration Checklist – From @not-code to Modular AI Memory CLI

- [x] **Preparation**
  - [x] Audit the current @not-code codebase: list all files, folders, and their purposes
  - [x] Identify all legacy/flat memory bank files and any custom scripts or logic

- [x] **Mapping**
  - [x] Map each old file/folder to its new location in the modular structure (see implementation plan)
  - [x] Document any files that will be deprecated or replaced
  - [x] Identify any business logic that needs to move to `src/core/`

- [x] **Migration**
  - [x] Migrate all business logic to `src/core/` (file IO, validation, migration, templates)
  - [x] Refactor CLI entrypoints and command handlers to `src/cli/`
  - [x] Move MCP server setup, tool/resource registration, and transport logic to `src/mcp/`
  - [x] Move HTTP/SSE server logic to `src/http/`
  - [x] Move rules engine, consent, and canonical rules to `src/rules/`
  - [x] Centralise all types and enums in `src/types/`
  - [x] Move shared utilities to `src/utils/`

- [x] **Validation**
  - [x] Run all unit and integration tests to ensure core logic works as expected (in progress)
  - [x] Use the CLI and MCP tools to verify memory bank self-healing, migration, and file access
  - [x] Check that all VS Code extension commands and webview features work as intended (pending webview)
  - [x] Validate that legacy/flat files are correctly migrated and accessible

- [x] **Post-Migration**
  - [x] Remove deprecated files and folders from the old @not-code codebase (after backup)
  - [x] Update documentation to reflect the new structure and migration process
  - [x] Announce migration completion to the team and update onboarding guides
  - [x] Monitor for any issues or regressions and address promptly

*This checklist ensures a safe, thorough, and maintainable migration to the new modular architecture.*

---
