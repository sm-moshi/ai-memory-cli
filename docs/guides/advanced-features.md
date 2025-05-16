# Advanced Features

This guide covers advanced MCP tools and patterns for **AI Memory MCP CLI** beyond the core file operations.

---

## 1. Chunked File Access

Large files (>30 KB) can be loaded in chunks to avoid model overload:

- Tool: `read-memory-bank-files` returns file metadata including size.
- Use `chunkIndex` parameter in `get-memory-bank-file`:

```json
{
  "jsonrpc": "2.0",
  "method": "get-memory-bank-file",
  "params": {
    "fileType": "systemPatterns/patterns.md",
    "chunkIndex": 0,
    "chunkSize": 15000
  }
}
```

- Continue with increasing `chunkIndex` until full content is retrieved.

---

## 2. Metadata Tool

Retrieve file sizes and statuses before reading:

- Tool: `get-memory-bank-metadata`

```bash
echo '{"jsonrpc":"2.0","id":2,"method":"get-memory-bank-metadata"}' |   ai-memory-cli serve
```

Response example:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": [
    {"fileType":"core/projectbrief.md","size":1024,"lastUpdated":"2025-05-15T12:34:56Z"},
    {"fileType":"progress/current.md","size":2048,"lastUpdated":"2025-05-15T12:00:00Z"}
  ]
}
```

Use this to warn or chunk large files.

---

## 3. Planner Tools

Automate plan generation and updates:

- **`update-current-plan`**
  Overwrites `progress/current.md` with a new plan.

  Example call:

  ```bash
  echo '{"jsonrpc":"2.0","id":3,"method":"update-current-plan","params":{"content":"### Next Steps
- Task A
- Task B"}}' |     ai-memory-cli serve
  ```

- **`append-note`** (Prototype)
  Adds timestamped notes to `progress/history.md`:

  ```bash
  echo '{"jsonrpc":"2.0","id":4,"method":"append-note","params":{"text":"Investigate chunking logic"}}' |     ai-memory-cli serve
  ```

---

## 4. Safety & Rollback

- All write tools prompt for confirmation if overwriting non-`progress/` files.
- Maintain backups under `memory-bank/.history/` (future feature).
- Use `ai-memory-cli init --force` to reset to templates.

---

## 5. Safety, Consent, and Git Workflows (Critical Safety Rule)

**Warning: Accidental data loss can occur when switching git branches or using stashes if the memory bank folder is missing or out of sync.**

### What Can Happen
- If you switch to a branch without a `memory-bank/` and then back to one with it, AI Memory may think the memory bank is missing and auto-initialise a new, empty one.
- This can overwrite or delete your real memory bank, resulting in permanent data loss.

### Best Practices (For Users)
- **Always back up your memory bank** before switching branches, stashing, or merging.
- **Check the status of your memory bank** after any git operation that changes the folder structure.
- If prompted to heal, repair, or upgrade, review the situation carefully before proceeding.

### Best Practices (For Implementation)
- **Never auto-initialise, heal, or repair without explicit user consent** if the memory bank was recently present or git status is ambiguous.
- **Always prompt the user**: 'A memory bank was not found. Would you like to [Heal] (create new), [Repair] (try to recover), [Upgrade] (migrate), or [Cancel] (do nothing)?'
- **Back up any existing files** before making changes.
- **Log all actions and decisions** for auditability.

### Critical Safety Rule
> AI Memory must always ask for user consent before any healing, repair, or upgrade operation that could overwrite or delete data, especially after git branch switches or stashing.

---

||||||| Stash base
=======
For core operations and troubleshooting, see [Server Setup](server.md) and [Troubleshooting](troubleshooting.md).
