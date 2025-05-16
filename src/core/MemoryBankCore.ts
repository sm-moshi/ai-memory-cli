// MemoryBankCore.ts
// Core logic for the modular memory bank system
// See: docs/dev/memory-bank-core.md

import { promises as fs } from 'node:fs'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'node:path'; // eslint-disable-line import/no-extraneous-dependencies
import { z } from 'zod';

/**
 * MemoryBankCore
 * Async-first, modular class for managing memory bank files and folders.
 * All methods are concurrency-aware and follow project best practices.
 */
export class MemoryBankCore {
  private baseDir;

  constructor(baseDir = 'memory-bank') {
    this.baseDir = baseDir;
    // Self-heal on construction
    this.selfHeal().catch(err => {
      // Log but do not throw in constructor
      console.error('MemoryBankCore self-healing failed:', err);
    });
  }

  /**
   * Self-healing: Ensure all required folders and files exist, creating them from templates if missing.
   */
  async selfHeal(): Promise<void> {
    const folders = [
      '',
      'core',
      'systemPatterns',
      'techContext',
      'progress',
    ];
    for (const folder of folders) {
      const folderPath = path.join(this.baseDir, folder);
      await fs.mkdir(folderPath, { recursive: true });
    }
    // Required files and their templates
    const files: { relativePath: string; template: string }[] = [
      { relativePath: 'core/projectbrief.md', template: MemoryBankCore.getTemplate('core/projectbrief.md') },
      { relativePath: 'core/productContext.md', template: MemoryBankCore.getTemplate('core/productContext.md') },
      { relativePath: 'core/activeContext.md', template: MemoryBankCore.getTemplate('core/activeContext.md') },
      { relativePath: 'systemPatterns/index.md', template: MemoryBankCore.getTemplate('systemPatterns/index.md') },
      { relativePath: 'systemPatterns/architecture.md', template: MemoryBankCore.getTemplate('systemPatterns/architecture.md') },
      { relativePath: 'systemPatterns/patterns.md', template: MemoryBankCore.getTemplate('systemPatterns/patterns.md') },
      { relativePath: 'systemPatterns/scanning.md', template: MemoryBankCore.getTemplate('systemPatterns/scanning.md') },
      { relativePath: 'techContext/index.md', template: MemoryBankCore.getTemplate('techContext/index.md') },
      { relativePath: 'techContext/stack.md', template: MemoryBankCore.getTemplate('techContext/stack.md') },
      { relativePath: 'techContext/dependencies.md', template: MemoryBankCore.getTemplate('techContext/dependencies.md') },
      { relativePath: 'techContext/environment.md', template: MemoryBankCore.getTemplate('techContext/environment.md') },
      { relativePath: 'progress/index.md', template: MemoryBankCore.getTemplate('progress/index.md') },
      { relativePath: 'progress/current.md', template: MemoryBankCore.getTemplate('progress/current.md') },
      { relativePath: 'progress/history.md', template: MemoryBankCore.getTemplate('progress/history.md') },
    ];
    for (const { relativePath, template } of files) {
      const filePath = path.join(this.baseDir, relativePath);
      try {
        await fs.access(filePath);
      } catch {
        await fs.writeFile(filePath, template, 'utf8');
        console.info(`Self-healed: Created missing file ${relativePath}`);
      }
    }
  }

  /**
   * Get the default template for a given file path.
   */
  static getTemplate(relativePath: string): string {
    switch (relativePath) {
      case 'core/projectbrief.md':
        return '# Project Brief\n\n*Foundation document that shapes all other files*\n\n## Core Requirements\n\n## Project Goals\n\n## Project Scope\n';
      case 'core/productContext.md':
        return '# Product Context\n\n## Why this project exists\n\n## Problems it solves\n\n## How it should work\n\n## User experience goals\n';
      case 'core/activeContext.md':
        return '# Active Context\n\n## Current work focus\n\n## Recent changes\n\n## Next steps\n\n## Active decisions and considerations\n';
      case 'systemPatterns/index.md':
        return '# System Patterns Index\n\n*Summary of system patterns and architecture*\n';
      case 'systemPatterns/architecture.md':
        return '# System Architecture\n\n*Describe the overall system architecture here*\n';
      case 'systemPatterns/patterns.md':
        return '# Patterns\n\n*List and describe design patterns in use*\n';
      case 'systemPatterns/scanning.md':
        return '# Scanning\n\n*Describe scanning or analysis patterns here*\n';
      case 'techContext/index.md':
        return '# Tech Context Index\n\n*Summary of technology stack and constraints*\n';
      case 'techContext/stack.md':
        return '# Technology Stack\n\n*List all major technologies used*\n';
      case 'techContext/dependencies.md':
        return '# Dependencies\n\n*List and describe project dependencies*\n';
      case 'techContext/environment.md':
        return '# Environment\n\n*Describe the development and production environments*\n';
      case 'progress/index.md':
        return '# Progress Index\n\n*Summary of project progress*\n';
      case 'progress/current.md':
        return '# Current Progress\n\n*Describe current work, blockers, and next steps*\n';
      case 'progress/history.md':
        return '# Progress History\n\n*Log of past progress and milestones*\n';
      default:
        return '# Memory Bank File\n\n*This is a default template*\n';
    }
  }

  /**
   * Read a memory bank file asynchronously and validate if applicable.
   * @param relativePath Path relative to the memory bank root
   */
  async readFile(relativePath: string): Promise<string> {
    const filePath = path.join(this.baseDir, relativePath);
    const content = await fs.readFile(filePath, 'utf8');
    // Validate projectbrief.md if applicable
    if (relativePath === 'core/projectbrief.md') {
      this.validateProjectBrief(content);
    }
    return content;
  }

  /**
   * Write to a memory bank file asynchronously.
   * @param relativePath Path relative to the memory bank root
   * @param content File content to write
   */
  async writeFile(relativePath: string, content: string): Promise<void> {
    const filePath = path.join(this.baseDir, relativePath);
    await fs.writeFile(filePath, content, 'utf8');
  }

  /**
   * List all files in a memory bank subfolder.
   * @param subfolder Subfolder under the memory bank root
   */
  async listFiles(subfolder: string): Promise<string[]> {
    const dirPath = path.join(this.baseDir, subfolder);
    return await fs.readdir(dirPath);
  }

  /**
   * Validate the structure of projectbrief.md using Zod.
   * Checks for required headings as a simple structure validation.
   * Throws if validation fails.
   */
  validateProjectBrief(content: string): void {
    // Simple regex-based check for required headings
    const requiredHeadings = [
      /^# Project Brief/m,
      /^## Core Requirements/m,
      /^## Project Goals/m,
      /^## Project Scope/m
    ];
    for (const heading of requiredHeadings) {
      if (!heading.test(content)) {
        throw new Error(`projectbrief.md is missing required section: ${heading}`);
      }
    }
    // Optionally, parse and validate more structure with Zod in future
  }

  /**
   * Read a chunk of a memory bank file asynchronously.
   * @param relativePath Path relative to the memory bank root
   * @param chunkIndex Zero-based index of the chunk
   * @param chunkSize Size of each chunk in bytes (default: 15000)
   * @returns The chunk as a string, or an empty string if out of range
   */
  async readFileChunked(relativePath: string, chunkIndex: number, chunkSize = 15000): Promise<string> {
    const filePath = path.join(this.baseDir, relativePath);
    const handle = await fs.open(filePath, 'r');
    try {
      const { size } = await handle.stat();
      const start = chunkIndex * chunkSize;
      if (start >= size) return '';
      const end = Math.min(start + chunkSize, size);
      const buffer = Buffer.alloc(end - start);
      await handle.read(buffer, 0, end - start, start);
      return buffer.toString('utf8');
    } finally {
      await handle.close();
    }
  }

  // TODO: Add Zod validation for other file types, self-healing logic, chunked access, and logging as per docs/dev/memory-bank-core.md
}
