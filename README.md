# AI Memory CLI for Cursor 🐹

> **CLI‑first memory‑bank toolkit for Cursor’s Model‑Context‑Protocol — persistent context, `/memory` & `/note` commands, zero UI.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![npm](https://img.shields.io/npm/v/ai-memory-cli.svg?label=npm)
![CI](https://img.shields.io/github/actions/workflow/status/sm-moshi/ai-memory-cli/ci.yml?label=build)

## Vision & Philosophy

AI Memory CLI is designed for developers who want a robust, modular, and persistent project memory—**without any webview or GUI overhead**. It is CLI-first, Cursor-native, and rules-driven, providing seamless integration with:

- **Cursor Command Palette**: All memory bank commands are available for quick access.
- **Output Window**: All actions and errors are logged for transparency and debugging.
- **Agent/Command (Chat) Workflows**: `/memory`, `/note`, and `/plan` commands are available in chat and automation.

**No webview, no Electron, no distractions—just a stable, extensible memory bank for your project.**

## Why?

Cursor 0.50+ introduces an MCP CLI entry‑point, yet it still lacks a lightweight,
headless tool for **persistent project memory**.
_AI Memory CLI_ fills that gap:

* **Stores** rich markdown memory in a modular folder.
* **Serves** it through an MCP stdio server (`ai-memory-cli`).
* **Responds** to chat commands like `/memory status`, `/note`, `/plan`.
* **Logs** neatly to VS Code / Cursor *Output* channel.
* **No WebView, no Electron overhead**.

## Quick start

```bash
# one‑shot
npx ai-memory-cli --init

# during development
pnpm install
pnpm build:cli
./dist/ai-memory-cli --stdio
```

*Requires Node ≥ 20.19 and TypeScript ≥ 5.4 (bundled).*

## Features

| Status | Feature                                                |
| ------ | ------------------------------------------------------ |
| 🔄      | Modular memory‑bank on first run                       |
| 🔄      | MCP stdio server auto‑registered in `.cursor/mcp.json` |
| 🔄      | `/memory` command handler                              |
| 🔄      | Command Palette & Output window integration            |
| 🔄      | Agent/Command (chat) support                           |
| 🔄      | Rules-driven, template-based onboarding & repair       |
| 🔄      | Chunked read/write (v0.4)                              |
| 🔄      | Planner + `/plan` (v0.4)                               |
| 🧪      | Lightweight NLP `/note` prototype                      |

## Roadmap

See **[ROADMAP.md](ROADMAP.md)** for detailed milestones.

## Credits

Originally forked from **@ipenywis/aimemory** (MIT).
Fully re‑architected & actively maintained by **@sm‑moshi** since `v0.3.0‑alpha`.

## License

MIT – see [LICENSE](LICENSE).
