// Command router for AI Memory CLI
// British English spelling and idiomatic TypeScript

import { MemoryBankService } from '../core/index.js';
import { MemoryBankFileType } from '../types/types.js';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { enforceWithConsent } from '../rules/integration.js';
import { RuleType } from '../rules/rulesEngine.js';

const DEFAULT_MEMORY_BANK_PATH = path.resolve('./memory-bank');
const logger = console;
const memoryBank = new MemoryBankService(DEFAULT_MEMORY_BANK_PATH, logger);

function getFileType(arg: string): MemoryBankFileType | undefined {
  // Try enum key
  if ((MemoryBankFileType as Record<string, string>)[arg]) {return (MemoryBankFileType as Record<string, string>)[arg] as MemoryBankFileType;}
  // Try value
  const match = Object.values(MemoryBankFileType).find(v => v === arg);
  return match as MemoryBankFileType | undefined;
}

function printHelp() {
  console.log('AI Memory CLI\n\nUsage:\n  aimemory <command> [options]\n\nCommands:\n  init         Initialise a new memory bank\n  status       Show memory bank status\n  get <file>   Print the contents of a memory bank file\n  set <file>   Update the contents of a memory bank file\n  help         Show this help message\n  /memory ...  Legacy agent/extension commands supported');
}

export async function commandRouter(command: string, args: string[]): Promise<void> {
  // Handle /memory commands for agent/extension compatibility
  if (command === '/memory' || command.startsWith('/memory')) {
    const sub = args[0];
    switch (sub) {
      case 'status': {
        await commandRouter('status', []);
        return;
      }
      case 'update': {
        if (!args[1] || !args[2]) {
          console.error('Usage: /memory update <fileType> <content>');
          process.exit(1);
        }
        const fileType = args[1];
        const content = args.slice(2).join(' ');
        // Simulate stdin for set command
        process.stdin.setEncoding('utf-8');
        const oldStdin = process.stdin;
        const chunks = [content];
        (process.stdin as NodeJS.ReadableStream & { [Symbol.asyncIterator]: () => AsyncIterableIterator<string> })[Symbol.asyncIterator] = async function* () {
          for (const chunk of chunks) {yield chunk;}
        };
        await commandRouter('set', [fileType]);
        process.stdin = oldStdin;
        return;
      }
      case 'help':
      default:
        printHelp();
        return;
    }
  }
  switch (command) {
    case "init": {
      await memoryBank.initializeFolders();
      const created = await memoryBank.loadFiles();
      if (created.length === 0) {
        console.log('Memory bank already initialised.');
      } else {
        console.log(`Initialised memory bank. Created files: ${created.join(', ')}`);
      }
      break;
    }
    case "status": {
      const isInit = await memoryBank.getIsMemoryBankInitialized();
      if (!isInit) {
        console.log('Memory bank is not initialised. Run `aimemory init` first.');
        process.exit(1);
      }
      await memoryBank.loadFiles();
      const files = memoryBank.getAllFiles();
      console.log(`Memory bank is initialised. Loaded files (${files.length}):`);
      for (const file of files) {
        console.log(`- ${file.type}`);
      }
      break;
    }
    case "get": {
      if (!args[0]) {
        console.error("Error: No file specified for 'get' command.");
        process.exit(1);
      }
      const fileType = getFileType(args[0]);
      if (!fileType) {
        console.error(`Unknown file type: ${args[0]}`);
        process.exit(1);
      }
      await memoryBank.loadFiles();
      const file = memoryBank.getFile(fileType);
      if (!file) {
        console.error(`File not found: ${fileType}`);
        process.exit(1);
      }
      process.stdout.write(file.content);
      break;
    }
    case "set": {
      if (!args[0]) {
        console.error("Error: No file specified for 'set' command.");
        process.exit(1);
      }
      const fileType = getFileType(args[0]);
      if (!fileType) {
        console.error(`Unknown file type: ${args[0]}`);
        process.exit(1);
      }
      // Read new content from stdin
      let newContent = '';
      process.stdin.setEncoding('utf-8');
      for await (const chunk of process.stdin) {
        newContent += chunk;
      }
      await memoryBank.loadFiles();
      // Rules/consent check before update
      const allowed = await enforceWithConsent(
        RuleType.FileAccess,
        fileType,
        async (action) => {
          // Simple CLI prompt for consent
          process.stdout.write(`Consent required to update ${action}. Proceed? [y/N]: `);
          return await new Promise<boolean>((resolve) => {
            process.stdin.once('data', (input: unknown) => {
              const answer = typeof input === 'string' ? input.trim().toLowerCase() : '';
              resolve(answer === 'y');
            });
          });
        }
      );
      if (!allowed) {
        console.error(`Update denied by rules or user consent for file: ${fileType}`);
        process.exit(1);
      }
      await memoryBank.updateFile(fileType, newContent);
      console.log(`Updated file: ${fileType}`);
      break;
    }
    default:
      console.error(`Unknown command: ${command}`);
      process.exit(1);
  }
}
