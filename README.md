# AI Memory CLI for Cursor

> **CLI‑first memory‑bank toolkit for Cursor's Model‑Context‑Protocol — persistent context, `/memory` & `/note` commands, zero UI.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![npm](https://img.shields.io/npm/v/ai-memory-cli.svg?label=npm)
![CI](https://img.shields.io/github/actions/workflow/status/sm-moshi/ai-memory-cli/ci.yml?label=build)

---

## Table of Contents

1. [AI Memory CLI for Cursor ](#ai-memory-cli-for-cursor-)
	1. [Table of Contents](#table-of-contents)
	2. [Vision \& Philosophy](#vision--philosophy)
	3. [Why AI Memory CLI?](#why-ai-memory-cli)
	4. [Features](#features)
	5. [Quick Start](#quick-start)
	6. [Configuration \& Options](#configuration--options)
	7. [CLI Usage](#cli-usage)
	8. [User Experience: CLI and GUI](#user-experience-cli-and-gui)
	9. [Documentation](#documentation)
	10. [Contributing](#contributing)
	11. [Support](#support)
	12. [Credits](#credits)
	13. [License](#license)
	14. [Advanced Usage \& FAQ](#advanced-usage--faq)

---

## Vision & Philosophy

AI Memory CLI is designed for developers who want a robust, modular, and persistent project memory—**without any webview or GUI overhead**. It is CLI-first, Cursor-native, and rules-driven, providing seamless integration with:

- **Cursor Command Palette**: All memory bank commands are available for quick access.
- **Output Window**: All actions and errors are logged for transparency and debugging.
- **Agent/Command (Chat) Workflows**: `/memory`, `/note`, and `/plan` commands are available in chat and automation.

**No webview, no Electron, no distractions—just a stable, extensible memory bank for your project.**

---

## Why AI Memory CLI?

Cursor 0.50+ introduces an MCP CLI entry‑point, yet it still lacks a lightweight, headless tool for **persistent project memory**.
_AI Memory CLI_ fills that gap:

- **Stores** rich markdown memory in a modular folder.
- **Serves** it through an MCP stdio server (`ai-memory-cli`).
- **Responds** to chat commands like `/memory status`, `/note`, `/plan`.
- **Logs** neatly to VS Code / Cursor *Output* channel.
- **No WebView, no Electron overhead**.

---

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
| 🔄      | Planner + `/plan` (v0.4)                               |
| 🧪      | Lightweight NLP `/note` prototype                      |

---

## Quick Start

```bash
# one‑shot
npx ai-memory-cli --init

# during development
pnpm install
pnpm build:cli
./dist/ai-memory-cli --stdio
```

> [!NOTE]
> Requires Node ≥ 20.19 and TypeScript ≥ 5.4 (bundled).

---

## Configuration & Options

- **CLI flags:**
  - `--stdio` (default): Run as stdio MCP agent (recommended for Cursor 0.50+)
  - `--http [--port <number>]`: Run as HTTP/SSE MCP agent (legacy/fallback)
  - `--init`: Initialise a new memory bank
  - `--log-level <level>`: Set log verbosity (trace, debug, info, warning, error, off)
- **Environment variables:**
  - `AI_MEMORY_CLI_CONFIG`: Path to custom config file (optional)
- **VS Code Extension Settings:**
  - Log level, Output window integration, Command Palette commands

---

## CLI Usage

```sh
ai-memory-cli status
ai-memory-cli read <relativePath>
ai-memory-cli chunk <relativePath> <chunkIndex> [chunkSize]
ai-memory-cli list <subfolder>
ai-memory-cli write <relativePath> <content>
```

- `status`: Checks if the memory bank is initialised and healthy.
- `read <relativePath>`: Reads and prints the contents of a memory bank file.
- `chunk <relativePath> <chunkIndex> [chunkSize]`: Reads a chunk of a file (default chunk size: 15,000 bytes).
- `list <subfolder>`: Lists all files in the given memory bank subfolder (e.g., `core`, `systemPatterns`).
- `write <relativePath> <content>`: Writes the given content to the specified memory bank file.

> [!NOTE]
> Validation is enforced on both read and write for `core/projectbrief.md`, `core/productContext.md`, and `core/activeContext.md`. If a required section is missing, the operation will fail with a clear error. To fix, ensure your file includes all required headings as shown in the templates.

Example:
```sh
ai-memory-cli list core
ai-memory-cli write core/test.md "Hello, Memory Bank!"
```

---

## User Experience: CLI and GUI

While AI Memory CLI is designed as a CLI-first toolkit for robust agent and automation workflows, **end users interact with memory features primarily through Cursor's GUI**. This includes:

- **/memory command**: Available in Cursor chat, command palette, and agent workflows. Users can check memory status, read files, and more without leaving the GUI.
- **/plan command (planned)**: Will be available both via CLI and as a chat/command palette feature in Cursor, enabling planning and roadmap workflows directly from the GUI.

> [!TIP]
> The CLI is ideal for development, automation, and advanced scripting, but most users will use memory features through Cursor's graphical interface.

---

## Documentation

- [Implementation Plan](docs/IMPLEMENTATION.md)
- [GitHub Repo Best Practices Checklist](docs/dev/github-repo-guide.md)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)
- [Contributing Guide](CONTRIBUTING.md)

---

## Contributing

We welcome contributions!
Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines, code style, and how to get started.

---

## Support

- **Issues:** Please use the [GitHub Issues](https://github.com/sm-moshi/ai-memory-cli/issues) page for bug reports and feature requests.
- **Contact:** For questions, reach out via GitHub Discussions or open an issue.

---

## Credits

Originally forked from **@ipenywis/aimemory** (MIT).
Fully re‑architected & actively maintained by **@sm‑moshi** since `v0.3.0‑alpha`.

---

## License

MIT – see [LICENSE](LICENSE).

---

## Advanced Usage & FAQ

<details>
<summary>How do I use chunked file access?</summary>

Use the `chunk` command to read large files in segments:
```sh
ai-memory-cli chunk core/projectbrief.md 0 15000
```
</details>

<details>
<summary>How do I run as an HTTP/SSE agent for legacy support?</summary>

```sh
ai-memory-cli --http --port 7331
```
</details>

<details>
<summary>How do I set the log level?</summary>

```sh
ai-memory-cli --log-level debug
```
</details>

---

> [!WARNING]
> This project is under active development. Features and CLI options may change between releases.
