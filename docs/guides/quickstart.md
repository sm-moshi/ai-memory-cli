# Quickstart

This guide shows you how to get started with **AI Memory MCP CLI** (v0.3.0-alpha).

## Prerequisites

- **Node.js** ≥ 20.x
- **npm** or **pnpm** installed globally
- A terminal (macOS, Linux, or Windows WSL)

## 1. Install the CLI

Install globally via npm:

```bash
npm install -g ai-memory-cli
```

Or via pnpm:

```bash
pnpm add -g ai-memory-cli
```

## 2. Initialize the Memory Bank

In your project root, run:

```bash
ai-memory-cli initialize
```

This will:

- Create the `memory-bank/` folder with subfolders (`core/`, `techContext/`, `progress/`, `systemPatterns/`)
- Scaffold required Markdown files with default templates
- Log setup progress to the console

## 3. Start the MCP Server

Launch the stdio-based MCP server for Cursor integration:

```bash
ai-memory-cli serve
```

By default, this will:

- Read and self-heal the memory bank
- Listen for MCP JSON-RPC messages over STDIO

Press **Ctrl+C** to stop.

## 4. Use in Cursor

Once the server is running, Cursor (0.50+) will automatically detect and connect:

```bash
/memory status
/memory list
/memory read core/projectbrief.md
/memory update-progress "Completed initial setup"
```

## 5. Additional Commands

- **Check status**:
  ```bash
  ai-memory-cli status
  ```
- **Self-heal without serving**:
  ```bash
  ai-memory-cli repair
  ```

## Next Steps

- Review and customize `memory-bank/core/projectbrief.md`.
- Explore advanced features (`append-note`, `update-current-plan`).

Happy memory banking!
