# Developer Guide: Rust & Python Extension Points

## Overview
Rust and Python extension points allow you to extend the AI Memory MCP system with high-performance or specialised modules, or to integrate with existing tools in those languages. This can be achieved via FFI, MCP server/client bridges, or by exposing compatible tools/resources.

## Why It Matters
- Leverage Rust for performance-critical or systems-level features (e.g., file IO, chunking, advanced validation).
- Use Python for rapid prototyping, data science, or integration with ML/AI libraries.
- Enable cross-language workflows and future-proof the architecture.

## When to Implement
- When you need features not easily implemented in TypeScript/Node.js.
- When integrating with existing Rust/Python codebases or libraries.
- After the core TypeScript/Node.js stack is stable.

## How to Implement
### 1. FFI (Foreign Function Interface)
- Use Node.js FFI (e.g., `napi-rs`, `neon` for Rust; `node-ffi` for Python) to call native modules from TypeScript.
- Expose a clean, async API for the rest of the stack.

### 2. MCP Server/Client Bridges
- Implement a Rust or Python MCP server using the official SDKs.
- Communicate with the main TypeScript MCP server via standard MCP tools/resources.
- Example: Use `/modelcontextprotocol/rust-sdk` or `/modelcontextprotocol/python-sdk`.

### 3. Expose Compatible Tools/Resources
- Register tools/resources in Rust/Python that match the MCP protocol.
- Use the main server as a proxy or orchestrator for cross-language calls.

## Integration Points
- **Memory Bank Core**: Offload performance-critical operations to Rust.
- **Planner/Automation**: Use Python for advanced AI/ML or data processing.
- **MCP Server**: Register and route cross-language tools/resources.

## Best Practices
- Keep FFI boundaries minimal and well-documented.
- Use async/await and robust error handling for all cross-language calls.
- Validate all inputs/outputs at the boundary.
- Reference official MCP SDK docs for Rust/Python.
- Log all cross-language actions for auditability.

## Troubleshooting
- For FFI errors, check native module build and compatibility.
- For MCP bridge issues, ensure protocol/version compatibility and tool registration.
- Validate all data passed between languages.

## References
- [modelcontextprotocol/rust-sdk](https://github.com/modelcontextprotocol/rust-sdk)
- [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk)
- [TypeScript SDK Quickstart](https://github.com/modelcontextprotocol/typescript-sdk)
- [memory-bank.dev.mdc](../../.cursor/rules/memory-bank.dev.mdc)

---
*Update this guide as the module evolves. For questions, consult the project rules or use Context7, clear-thought, and codex-keeper for best practices.*
