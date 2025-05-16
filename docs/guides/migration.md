# Migration Guide: Upgrading from 0.1.x–0.2.x to 0.3.0-alpha

_This guide helps you migrate old flat or early modular memory banks to the new CLI-first, Cursor-focused v0.3.0-alpha._

---

## Key Differences

- **CLI-first stdio** → no more HTTP/SSE dependency
- **Modular** memory-bank layout (`core/`, `systemPatterns/`, `techContext/`, `progress/`)
- **Self-healing**: missing files auto-created on init/serve
- **Cursor commands** now powered by `ai-memory-cli serve`

---

## Steps

1. **Backup** your existing `memory-bank/` and `.cursor/rules/`.
2. Install v0.3.0-alpha:
   ```bash
   npm install -g ai-memory-cli@0.3.0-alpha
   ```
3. Run:
   ```bash
   ai-memory-cli init
   ai-memory-cli serve
   ```
4. In Cursor, invoke `/memory repair` *(an alias for init + self-heal)*.
5. Verify file structure under `memory-bank/`.
6. Test `/memory read core/projectbrief.md`.

If anything fails, consult [troubleshooting.md](./troubleshooting.md).
