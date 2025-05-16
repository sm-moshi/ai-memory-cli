# MCP Server Setup

This guide walks you through setting up the AI Memory MCP server (CLI/​stdio transport).

---

## Why CLI/stdio?

- **Cursor 0.50+** expects MCP servers launched as CLI with JSON-RPC over STDIO.
- Decouples from HTTP/SSE and webview dependencies.
- Ensures context-agnostic operation in terminals, CI, or headless environments.

---

## Prerequisites

- **Node.js** ≥ 20.x
- **ai-memory-cli** installed (see Quickstart).
- Permissions to write `.cursor/mcp.json` in your project.

---

## 1. Initialize Memory Bank

Before starting the server, ensure your memory is scaffolded:

```bash
ai-memory-cli init
```

This runs the `initialize-memory-bank` tool to self-heal:

- Creates missing folders (`core/`, `systemPatterns/`, etc.).
- Writes default `.md` templates.

---

## 2. Start the MCP Server

Launch the stdio-based MCP server:

```bash
ai-memory-cli serve [--port <port>]
```

- Default port is **7331**, auto-fails over to **7332** on conflict.
- Opens a JSON-RPC 2.0 session over STDIO, listening for MCP tool calls.

> The server updates `.cursor/mcp.json` to point Cursor at the CLI entrypoint.

---

## 3. Tool & Resource Registration

The MCP server exposes the following tools and resources:

| Tool                       | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| `initialize-memory-bank`   | Scaffold & repair memory bank structure   |
| `read-memory-bank-files`   | List & load all memory-bank files         |
| `get-memory-bank-file`     | Read content of a specific file           |
| `update-memory-bank-file`  | Safely write content to a file            |
| `get-memory-bank-metadata` | Retrieve file sizes & status              |
| `update-current-plan`      | Write new plan into `progress/current.md` |
| `append-note`              | Prototype: add timestamped notes          |

All tools validate inputs with **Zod** and adhere to JSON-RPC 2.0 error handling.

---

## 4. Testing the Server

You can simulate a tool call via STDIO:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"read-memory-bank-files"}' |   ai-memory-cli serve
```

Expected response:

```json
{"jsonrpc":"2.0","id":1,"result":["core/projectbrief.md","progress/current.md",...]}
```

---

## 5. Advanced Configuration

- **Custom ports**: use `--port` flag.
- **Verbose logs**: set `AI_MEMORY_LOG=debug` in environment.
- **Session state**: CLI supports stateful sessions if `--session` flag provided (future feature).

---

For additional server troubleshooting, see [Troubleshooting](troubleshooting.md).
