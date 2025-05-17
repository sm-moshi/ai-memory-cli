# Logging & Cursor Config

> **2025-05-17:** TODO: There is no logger utility or Output Channel integration in the codebase. This file describes planned features.

This developer reference covers two core utilities used by the AI Memory MCP CLI and future VSIX:

---

## Logger (`utils/log.ts`)

- Singleton pattern with `Logger.getInstance()` (planned).
- Log levels: `trace`, `debug`, `info`, `warning`, `error`, `off` (planned).
- Usage:
  ```ts
  // Planned:
  // const logger = Logger.getInstance();
  // logger.setLevel(LogLevel.debug);
  // logger.info("Initializing memory bank");
  // logger.error("Failed to read file", { fileType });
  ```
- Integrates with the Output Channel in Cursor/VS Code (planned):
  - Webview and MCP server route messages via `sendLog` (planned).

---

## Cursor MCP Config (`utils/cursor-config.ts`)

Automatically manages `.cursor/mcp.json`:

- Ensures `.cursor` folder exists.
- Reads/creates `mcp.json` with a list of servers.
- Updates entrypoint URL to `"stdio:ai-memory-cli serve"` or HTTP port.
- Example:
  ```ts
  await updateCursorMCPConfig(7331);
  // Writes:
  // {
  //   "mcpServers": [
  //     { "url": "stdio:ai-memory-cli serve", "name": "AI Memory" }
  //   ]
  // }
  ```
- Ensures Cursor can find and launch the MCP CLI seamlessly.

---

Keep this file under `docs/wip/`—it's for developer reference only.
