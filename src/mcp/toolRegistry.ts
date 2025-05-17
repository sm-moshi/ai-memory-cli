// Tool registry for MCP server

import { MemoryBankService, validateFile, migrateLegacyFile } from '../core/index.js';
import type { MemoryBankFileType } from '../types/types.js';
import * as path from 'node:path';
import { enforceWithConsent } from '../rules/integration.js';
import { RuleType } from '../rules/rulesEngine.js';

const DEFAULT_MEMORY_BANK_PATH = path.resolve('./memory-bank');
const memoryBank = new MemoryBankService(DEFAULT_MEMORY_BANK_PATH, console);

/**
 * Registers and exposes all available tools for the MCP server.
 * Returns an object mapping tool names to handler functions.
 */
export function registerTools() {
  return {
    // Aliases for legacy and commandHandler compatibility
    'get-memory-bank-file': async (type: MemoryBankFileType) => {
      await memoryBank.loadFiles();
      return memoryBank.getFile(type);
    },
    'update-memory-bank-file': async (type: MemoryBankFileType, content: string) => {
      await memoryBank.loadFiles();
      await memoryBank.updateFile(type, content);
      return { updated: true };
    },
    'list-memory-bank-files': async () => {
      await memoryBank.loadFiles();
      return memoryBank.getAllFiles();
    },
    'read-memory-bank-files': async () => {
      await memoryBank.loadFiles();
      return memoryBank.getFilesWithFilenames();
    },
    'initialize-memory-bank': async () => {
      await memoryBank.initializeFolders();
      await memoryBank.loadFiles();
      return { initialised: true };
    },
    // Modern API
    memoryBank: {
      async getFile(type: MemoryBankFileType) {
        await memoryBank.loadFiles();
        return memoryBank.getFile(type);
      },
      async updateFile(type: MemoryBankFileType, content: string) {
        await memoryBank.loadFiles();
        await memoryBank.updateFile(type, content);
        return { updated: true };
      },
      async getAllFiles() {
        await memoryBank.loadFiles();
        return memoryBank.getAllFiles();
      },
    },
    validate: {
      validateFile,
    },
    migrate: {
      migrateLegacyFile,
    },
    // Add more tools/resources here as needed
  };
}
