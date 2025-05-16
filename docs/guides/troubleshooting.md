# AI Memory MCP Troubleshooting

## 1. Initialization & Self-Healing

- **`memory-bank/` missing?**
  Run `ai-memory-cli init` or `/memory repair`.
- **Partial folder structure?**
  Check write permissions in your workspace.

## 2. `/memory` Commands Unresponsive

- No running `serve` process?
  Start with `ai-memory-cli serve`.
- Port clash?
  CLI auto-fails from 7331 → 7332.
  To override: `ai-memory-cli serve --port 7333`.

## 3. Output Channel Logs

- In Cursor/VS Code, open the **AI Memory** Output Channel via Command Palette.
- Look for errors prefixed `AI Memory [Error]`.

## 4. CLI‑Specific Issues

- **`npx ai-memory-cli` hangs**
  Try clearing pnpm cache:
  ```bash
  pnpm store prune
  ```
  or reinstall globally.

## 5. Advanced Debug

```js
// SSE legacy check (for HTTP mode only)
const es = new EventSource('http://localhost:7331/sse');
es.onmessage = e => console.log(e.data);
```

---

If still stuck, file an issue with:
- Exact commands you ran
- Contents of `memory-bank/`
- AI Memory logs
