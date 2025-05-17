import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import mock from 'mock-fs';
import { MemoryBankService } from '../../src/core/memoryBank';
import { MemoryBankFileType } from '../../src/types/types';
import { getTemplateForFileType } from '../../src/core/templates';
import * as fs from 'node:fs/promises';

const TEST_PATH = './tmp-memory-bank';
const logger = { info: () => {}, warn: () => {}, error: () => {}, log: () => {} } as Console;

describe('MemoryBankService', () => {
  beforeEach(() => {
    // Mock the filesystem for each test
    mock({});
  });
  afterEach(() => {
    mock.restore();
  });

  it('should self-heal and create missing files from template', async () => {
    const svc = new MemoryBankService(TEST_PATH, logger);
    await svc.initializeFolders();
    const created = await svc.loadFiles();
    // Should create at least one file (all missing)
    expect(created.length).toBeGreaterThan(0);
    // Check that a core file exists and matches template
    const filePath = `${TEST_PATH}/core/projectbrief.md`;
    const content = await fs.readFile(filePath, 'utf-8');
    expect(content).toBe(getTemplateForFileType(MemoryBankFileType.ProjectBrief));
  });

  it('should migrate legacy flat file to modular structure', async () => {
    // Simulate legacy file
    mock({
      [`${TEST_PATH}/projectbrief.md`]: '# Legacy Project Brief\nOld content',
    });
    const svc = new MemoryBankService(TEST_PATH, logger);
    await svc.initializeFolders();
    await svc.loadFiles();
    // Should migrate legacy file: check that modular file exists and contains migrated content
    const filePath = `${TEST_PATH}/core/projectbrief.md`;
    const content = await fs.readFile(filePath, 'utf-8');
    expect(content).toContain('Project Brief');
    expect(content).toContain('Old content');
  });

  it('should update a file and validate new content', async () => {
    const svc = new MemoryBankService(TEST_PATH, logger);
    await svc.initializeFolders();
    await svc.loadFiles();
    const newContent = '# Project Brief\n\n## Core Requirements\n\n## Project Goals\n\n## Project Scope\n';
    await svc.updateFile(MemoryBankFileType.ProjectBrief, newContent);
    const file = svc.getFile(MemoryBankFileType.ProjectBrief);
    expect(file?.content).toBe(newContent);
  });
});
