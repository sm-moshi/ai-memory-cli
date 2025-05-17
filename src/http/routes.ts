// HTTP routes for AI Memory CLI
// British English spelling and maintainability

import type { FastifyInstance } from 'fastify';
import { MemoryBankService } from '../core/index.js';
import { MemoryBankFileType } from '../types/types.js';
import * as path from 'node:path';
import { enforceWithConsent } from '../rules/integration.js';
import { RuleType } from '../rules/rulesEngine.js';

const DEFAULT_MEMORY_BANK_PATH = path.resolve('./memory-bank');
const memoryBank = new MemoryBankService(DEFAULT_MEMORY_BANK_PATH, console);

// 'server' is a Fastify instance
export function registerRoutes(server: FastifyInstance) {
  // GET /memory-bank/:fileType - get file content
  server.get('/memory-bank/:fileType', async (request, reply) => {
    const { fileType } = request.params as { fileType: string };
    await memoryBank.loadFiles();
    const type = (MemoryBankFileType as Record<string, string>)[fileType] || fileType;
    const file = memoryBank.getFile(type as MemoryBankFileType);
    if (!file) {
      reply.code(404).send({ error: `File not found: ${fileType}` });
      return;
    }
    reply.send({ fileType, content: file.content, lastUpdated: file.lastUpdated });
  });

  // POST /memory-bank/:fileType - update file content
  server.post('/memory-bank/:fileType', async (request, reply) => {
    const { fileType } = request.params as { fileType: string };
    const { content } = request.body as { content: string };
    if (typeof content !== 'string') {
      reply.code(400).send({ error: 'Missing or invalid content.' });
      return;
    }
    await memoryBank.loadFiles();
    const type = (MemoryBankFileType as Record<string, string>)[fileType] || fileType;
    // Rules/consent check before update
    const allowed = await enforceWithConsent(
      RuleType.FileAccess,
      type,
      async () => true // For HTTP, always allow; extend for agent/consent
    );
    if (!allowed) {
      reply.code(403).send({ error: `Update denied by rules or user consent for file: ${fileType}` });
      return;
    }
    try {
      await memoryBank.updateFile(type as MemoryBankFileType, content);
      reply.send({ fileType, updated: true });
    } catch (err) {
      reply.code(400).send({ error: err instanceof Error ? err.message : String(err) });
    }
  });

  // TODO: Add more routes as needed
}
