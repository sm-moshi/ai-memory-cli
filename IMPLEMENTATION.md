# Implementation Guide

_Last updated: 2025-05-15_

## Vision & Scope

AI Memory CLI is a **stable, modular, CLI-first memory bank** for Cursor, designed for:
- Persistent, rules-driven project context
- Seamless integration with Cursor's Command Palette, Output window, and agent/command workflows
- No webview or GUI—just robust CLI and extension logic
- Self-healing, template-based onboarding and repair

## 1 • Project structure

```
ai-memory-cli/
  src/
    core/   ── memory‑bank logic
    cli/    ── MCP stdio entrypoint
  dist/     ── build artefacts
  tests/
```

* No GUI assets, no WebView.
* Built with **esbuild** into a single `dist/cli.js`.

## 2 • Build scripts

```jsonc
"scripts": {
  "build:cli": "esbuild src/cli/index.ts --platform=node --bundle --outfile=dist/ai-memory-cli.js",
  "dev": "ts-node-esm src/cli/index.ts --stdio"
}
```

## 3 • Key modules

| Path                        | Responsibility                |
| --------------------------- | ----------------------------- |
| `src/core/memoryBank.ts`    | File IO, templates, chunking  |
| `src/core/rules.ts`         | `.cursor/rules/*.mdc` parsing |
| `src/cli/index.ts`          | CLI → MCP stdio server        |
| `src/cli/commandHandler.ts` | `/memory`, `/note` routing    |

## 4 • Development checklist (v0.3)

- [ ] Port `MemoryBankServiceCore` with templates
- [ ] Implement stdio `McpServer` via `@modelcontextprotocol/sdk`
- [ ] Auto‑update `.cursor/mcp.json`
- [ ] Output channel logger (Output window integration)
- [ ] Register all memory bank commands with Command Palette
- [ ] Expose `/memory`, `/note`, `/plan` for agent/command workflows
- [ ] Implement robust rules and template logic for onboarding/repair
- [ ] Package & publish `ai-memory-cli@0.3.0-alpha`

---

*This implementation is based on best practices from `memory-bank.dev.mdc`, `memory-bank.user.mdc`, and the Cline Memory Bank methodology. The focus is on stability, maintainability, and deep Cursor integration—no webview required.*
