# Logging & Cursor Config

This developer reference covers two core utilities used by the AI Memory MCP CLI and future VSIX:

---

## Logger (`utils/log.ts`)

- **Singleton** pattern with `Logger.getInstance()`.
- Log levels: `trace`, `debug`, `info`, `warning`, `error`, `off`.
- Usage:
  ```ts
  const logger = Logger.getInstance();
  logger.setLevel(LogLevel.debug);
  logger.info("Initializing memory bank");
  logger.error("Failed to read file", { fileType });
  ```
- Integrates with the Output Channel in Cursor/VS Code:
  - Webview and MCP server route messages via `sendLog`.

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
