# AI Memory CLI – Changelog 🐹

> **All notable changes to this project will be documented in this file.**
> This project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

- Added `MemoryBankCore` class in `src/core/MemoryBankCore.ts`:
  - Async-first, concurrency-aware memory bank management
  - Self-healing logic to auto-create missing folders/files from templates
  - Zod-based validation for `core/projectbrief.md` structure
  - Static template method for all required memory bank files
  - Fully linted and idiomatic TypeScript implementation
- Updated progress log to reflect new implementation
- Initialisation of modular memory bank structure
- MCP stdio server auto-registration
- `/memory` command handler
- Command Palette & Output window integration
- Agent/Command (chat) support
- Rules-driven, template-based onboarding & repair
- Chunked read/write (v0.4)
- Planner + `/plan` (v0.4)
- Lightweight NLP `/note` prototype
- Added `list` command to CLI for listing files in a memory bank subfolder
- Updated README with CLI usage instructions and examples
- Added `write` command to CLI for writing content to a memory bank file
- Updated README with CLI usage instructions and examples for the write command

---

## [0.3.0-alpha] – 2025-05-16

- Project structure and memory bank initialisation
- CLI-first onboarding and repair
- MCP stdio server integration
- Modular markdown memory folders
- Full rewrite and re-architecture by @sm-moshi

---

## Credits

Originally forked from **@ipenywis/aimemory** (MIT).
Fully re‑architected & actively maintained by **@sm‑moshi** since `v0.3.0‑alpha`.

---

## License

MIT – see [LICENSE](LICENSE).
