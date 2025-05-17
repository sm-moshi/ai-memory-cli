# Implementation Plan – AI Memory CLI

_Last updated: 2025-05-18_

---

## Vision & Scope

AI Memory CLI is a **modular, robust, CLI-first memory bank** for Cursor 0.50+ and beyond. It is designed to:
- Provide persistent, rules-driven project context for LLMs and agents
- Integrate seamlessly with Cursor's Command Palette, Output window, and agent/command workflows
- Be CLI-first for agent integration and automation, but GUI-friendly for end users (via chat, command palette, agent workflows)
- Support both stdio (preferred for Cursor 0.50+) and HTTP (fallback/legacy) MCP agent modes
- Support self-healing, template-based onboarding, and robust migration from older/flat memory banks
- Be fully testable, maintainable, and future-proof
- **Be compiled as a VS Code extension too, enabling use of the Output Window and Command Palette (e.g., "AI Memory: Start Server", "Set Log Level") for enhanced user experience in Cursor/VS Code.**

> **Note:** HTTP/SSE fallback is maintained only for compatibility with pre-0.50 Cursor, VS Code, Windurf, and other potential clients. Stdio is the preferred and default mode for Cursor 0.50+ and future agent hosts.

---

## 1 • Project Structure

```
ai-memory-cli/
  src/
    core/
    cli/
    mcp/
    http/
    rules/
    utils/
    types/
  dist/
  tests/
  memory-bank/    # Modular memory bank (actually our git submodule with the dev team's memory)
  docs/           # Documentation, guides, onboarding
```

* No webview or GUI assets. CLI and MCP stdio/HTTP only.
* Built with **esbuild** into a single `dist/ai-memory-cli.js`.

## 2 • Project Folder Functions

### src/core/

Recommended files:

- `memoryBank.ts` – Main service for all memory bank file operations (read, write, update, validate, self-heal, migrate).
- `templates.ts` – Provides template content for each type of memory bank file and folder.
- `validation.ts` – Contains schema validation logic (e.g., Zod) for all file operations.
- `migration.ts` – Handles migration from legacy/flat file formats to the modular structure.
- `fsHelpers.ts` – Low-level file system helpers used internally by the core service.
- `index.ts` – Exports the public API of the core module for use by CLI, MCP, etc.

The `src/core/` directory contains the platform-agnostic engine for all Memory Bank logic. Its responsibilities are:
- Reading, writing, updating, and validating all memory bank files (Markdown or otherwise)
- Ensuring all required files and folders exist, creating them from templates if missing (self-healing)
- Supporting both modular and legacy/flat file formats for migration and compatibility
- Providing template content for each type of memory bank file
- Enforcing validation rules on all read/write operations
- Initialising folder structure and supporting migration from old/flat memory banks
- Exposing a platform-agnostic API for file operations (get, update, list, load)
- Integrating with the rules engine and logging via hooks or interfaces
- No CLI, HTTP, or MCP server logic—pure memory bank management only

### src/cli/

Recommended files:

- `cli.ts` – Main CLI entrypoint, responsible for parsing arguments and routing commands.
- `commandRouter.ts` – Handles command dispatching and maps CLI commands to core/MCP actions.
- `stdioServer.ts` – Implements the MCP stdio server for agent integration (Cursor 0.50+ preferred mode).
- `prompts.ts` – Stores CLI prompt strings and user-facing messages.
- `index.ts` – Exports the public API of the CLI module for use by the main entrypoint or tests.

The `src/cli/` directory contains the main CLI entrypoint and command routing logic. It is responsible for:
- Parsing command-line arguments and routing them to the appropriate core/MCP actions
- Implementing the MCP stdio server for agent integration (Cursor 0.50+ preferred mode)
- Storing CLI prompt strings and user-facing messages
- Exposing a public API for use by the main entrypoint or tests

### src/http/

Recommended files:

- `httpServer.ts` – Main HTTP server entrypoint for MCP agent mode, handling legacy/fallback requests.
- `routes.ts` – Defines HTTP/SSE routes/endpoints for MCP tools and resources.
- `sse.ts` – Implements Server-Sent Events (SSE) logic for real-time agent communication.
- `index.ts` – Exports the public API of the HTTP module for integration with the MCP server.

The `src/http/` directory contains the fallback/legacy HTTP server entrypoint for MCP agent mode. It is required for compatibility with pre-0.50 Cursor, VS Code, Windurf, and other clients that require HTTP/SSE agent endpoints. Stdio is preferred for Cursor 0.50+ and future agent hosts, but HTTP is maintained for broader compatibility.

### src/rules/

Recommended files:

- `rulesEngine.ts` – Core logic for parsing, enforcing, and evaluating memory bank rules.
- `mdcParser.ts` – Parses canonical .mdc (Markdown Consent/Rules) files into structured data.
- `consent.ts` – Handles user consent logic and enforcement for rule-governed actions.
- `memory-bank-rules.md` – Canonical rules markdown file defining project and memory bank policies.
- `index.ts` – Exports the public API of the rules module for use by core, MCP, and CLI layers.

The `src/rules/` directory contains all rules engine logic, parsing, enforcement, and consent logic. It is responsible for:
- Implementing the rules engine and services (e.g., parsing `.mdc` files, enforcing rules)
- Storing canonical rules markdown files (e.g., `memory-bank-rules.md`)
- Providing abstractions for rule enforcement and consent

### src/mcp/

Recommended files:

- `mcpServer.ts` – Main MCP server setup and entrypoint, handling both HTTP/SSE and stdio transports.
- `toolRegistry.ts` – Registers all MCP tools, resources, and agent prompts for the server.
- `transportManager.ts` – Manages HTTP/SSE and stdio transport logic for agent communication.
- `mcpPrompts.ts` – Stores all prompt strings and agent-facing resources for the MCP server.
- `index.ts` – Exports the public API of the MCP module for use by CLI, extension, or other entrypoints.

The `src/mcp/` directory is responsible for all MCP server setup and entrypoints (HTTP, stdio), tool/resource/prompt registration, and transport management. It orchestrates the core memory bank logic from `src/core/` but does not implement it directly. Its responsibilities are:
- Setting up MCP servers for HTTP/SSE and stdio
- Registering all MCP tools, resources, and agent prompts
- Managing HTTP/SSE and stdio transports
- Integrating with the core memory bank logic (imported from `src/core/`)
- Storing all prompt strings and agent-facing resources (e.g., `mcpPrompts.ts`)

### src/types/

Recommended files:

- `types.ts` – Core type definitions and interfaces for memory bank files, rules, and MCP tools.
- `enums.ts` – Enumerations for file types, rule categories, and other constants.
- `assets.d.ts` – TypeScript declaration file for importing non-code assets (e.g., Markdown files).
- `index.ts` – Exports all types, enums, and declarations for use across the project.

The `src/types/` directory contains all type definitions, interfaces, enums, and asset declarations used throughout the project. Its responsibilities are:
- Defining core data structures and contracts (e.g., `MemoryBankFileType`, `MemoryBank`)
- Providing TypeScript declaration files for non-code assets (e.g., `.md` imports)
- Ensuring type safety and consistency across all modules

### src/utils/

Recommended files:

- `logger.ts` – Provides logging utilities for consistent, configurable output across the project.
- `config.ts` – Helpers for managing and loading configuration (e.g., Cursor config, environment variables).
- `helpers.ts` – Generic, reusable utility functions used throughout the codebase.
- `index.ts` – Exports all utility functions and helpers for use by other modules.

The `src/utils/` directory contains all shared utility functions and helpers. Its responsibilities are:
- Providing logging utilities
- Managing configuration helpers (e.g., Cursor config)
- Storing other generic, reusable helpers used across the codebase

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
