// MCP server entry point for AI Memory CLI

import { startTransports, stopTransports } from './transportManager.js';

async function main() {
  console.log('Starting MCP server (stdio, HTTP, SSE)...');
  await startTransports();
  process.on('SIGINT', async () => {
    console.log('Shutting down MCP server...');
    await stopTransports();
    process.exit(0);
  });
}

main();
