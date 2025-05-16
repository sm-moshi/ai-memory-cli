#!/usr/bin/env node

// CLI entrypoint for AI Memory CLI
// Supports: status, read <relativePath>, chunk <relativePath> <chunkIndex> [chunkSize]
// Wires directly to MemoryBankCore

import { MemoryBankCore } from '../core/MemoryBankCore.js'; // Use .js extension for Node16+ module resolution

const core = new MemoryBankCore();

async function main() {
  const [,, cmd, ...args] = process.argv;

  switch (cmd) {
    case 'status':
      try {
        await core.selfHeal(); // Ensures everything is present
        console.log('Memory bank is initialised and healthy.');
      } catch (err) {
        console.error('Memory bank initialisation failed:', err);
        process.exit(1);
      }
      break;
    case 'read':
      if (!args[0]) {
        console.error('Usage: ai-memory-cli read <relativePath>');
        process.exit(1);
      }
      try {
        const content = await core.readFile(args[0]);
        console.log(content);
      } catch (err) {
        console.error('Error reading file:', err);
        process.exit(1);
      }
      break;
    case 'chunk':
      if (!args[0] || !args[1]) {
        console.error('Usage: ai-memory-cli chunk <relativePath> <chunkIndex> [chunkSize]');
        process.exit(1);
      }
      try {
        const chunkIndex = Number.parseInt(args[1], 10);
        const chunkSize = args[2] ? Number.parseInt(args[2], 10) : 15000;
        const chunk = await core.readFileChunked(args[0], chunkIndex, chunkSize);
        console.log(chunk);
      } catch (err) {
        console.error('Error reading file chunk:', err);
        process.exit(1);
      }
      break;
    case 'list':
      if (!args[0]) {
        console.error('Usage: ai-memory-cli list <subfolder>');
        process.exit(1);
      }
      try {
        const files = await core.listFiles(args[0]);
        for (const f of files) {
          console.log(f);
        }
      } catch (err) {
        console.error('Error listing files:', err);
        process.exit(1);
      }
      break;
    default:
      console.log('Usage: ai-memory-cli <status|read|chunk|list> [...]');
      process.exit(1);
  }
}

main();
