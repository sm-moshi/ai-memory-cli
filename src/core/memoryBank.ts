import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Stats } from "node:fs";
import type { MemoryBank, MemoryBankFile } from "../types/types.js";
import { MemoryBankFileType } from "../types/types.js";
import { getTemplateForFileType } from "./templates.js";
import { validateFile } from "./validation.js";
import { migrateLegacyFile } from "./migration.js";
import { enforceWithConsent } from '../rules/integration.js';

/**
 * Context-agnostic Memory Bank service for all file operations.
 * No VS Code or CLI dependencies. All logic is async and concurrency-safe.
 */
export class MemoryBankService implements MemoryBank {
  private _memoryBankFolder: string;
  files: Map<MemoryBankFileType, MemoryBankFile> = new Map();
  private ready = false;
  private logger: Console;

  constructor(memoryBankPath: string, logger?: Console) {
    this._memoryBankFolder = memoryBankPath;
    this.logger = logger || console;
  }

  /**
   * Checks if the memory bank is initialised (all required folders/files exist).
   */
  async getIsMemoryBankInitialized(): Promise<boolean> {
    try {
      this.logger.info('Checking if memory bank is initialised...');
      const isDirectoryExists = await fs.stat(this._memoryBankFolder).then(stat => stat.isDirectory()).catch(() => false);
      if (!isDirectoryExists) {
        this.logger.info('Memory bank folder does not exist.');
        return false;
      }
      // Only use string values from the enum, then cast to MemoryBankFileType[]
      const fileTypes = Object.values(MemoryBankFileType).filter(ft => typeof ft === 'string') as MemoryBankFileType[];
      for (const fileType of fileTypes) {
        if (fileType.includes('/')) {
          const filePath = path.join(this._memoryBankFolder, fileType);
          const exists = await fs.stat(filePath).then(stat => stat.isFile()).catch(() => false);
          this.logger.info(`Checked file: ${fileType} - Exists: ${exists}`);
          if (!exists) {
            return false;
          }
        }
      }
      this.logger.info('Memory bank is initialised.');
      return true;
    } catch (err) {
      this.logger.info(`Error checking memory bank initialisation: ${err instanceof Error ? err.message : String(err)}`);
      return false;
    }
  }

  /**
   * Ensures all required subfolders exist.
   */
  async initializeFolders(): Promise<void> {
    const subfolders = [
      '',
      'core',
      'systemPatterns',
      'techContext',
      'progress',
    ];
    for (const subfolder of subfolders) {
      const folderPath = path.join(this._memoryBankFolder, subfolder);
      await fs.mkdir(folderPath, { recursive: true });
    }
  }

  /**
   * Loads all memory bank files asynchronously, creating them from template if missing.
   * If a legacy/flat file exists, migrates its content to the new format.
   * Returns an array of created file types if self-healing occurred.
   * Validates each file after loading or creation; logs a warning if invalid.
   */
  async loadFiles(): Promise<MemoryBankFileType[]> {
    this.files.clear();
    this.logger.info('Loading all memory bank files...');
    const createdFiles: MemoryBankFileType[] = [];
    // Only use string values from the enum, then cast to MemoryBankFileType[]
    const fileTypes = Object.values(MemoryBankFileType).filter(ft => typeof ft === 'string') as MemoryBankFileType[];
    try {
      for (const fileType of fileTypes) {
        const filePath = path.join(this._memoryBankFolder, fileType);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        let content: string | undefined = undefined;
        let stats: Stats | undefined = undefined;
        try {
          content = await fs.readFile(filePath, "utf-8");
          stats = await fs.stat(filePath);
          this.logger.info(`Loaded file: ${fileType}`);
        } catch {
          // If file does not exist, check for legacy/flat file and attempt migration
          let migrated = false;
          let migrationWarnings: string[] | undefined;
          let legacyFilePath = '';
          // Map modular file type to legacy/flat file type
          switch (fileType) {
            case MemoryBankFileType.ProjectBrief:
              legacyFilePath = path.join(this._memoryBankFolder, MemoryBankFileType.ProjectBriefFlat);
              break;
            case MemoryBankFileType.ProductContext:
              legacyFilePath = path.join(this._memoryBankFolder, MemoryBankFileType.ProductContextFlat);
              break;
            case MemoryBankFileType.ActiveContext:
              legacyFilePath = path.join(this._memoryBankFolder, MemoryBankFileType.ActiveContextFlat);
              break;
            // Add more mappings as needed
            default:
              legacyFilePath = '';
          }
          if (legacyFilePath) {
            const legacyExists = await fs.stat(legacyFilePath).then(stat => stat.isFile()).catch(() => false);
            if (legacyExists) {
              const migration = await migrateLegacyFile(legacyFilePath, path.basename(legacyFilePath) as MemoryBankFileType);
              if (migration.wasMigrated) {
                content = migration.migratedContent;
                migrationWarnings = migration.warnings;
                migrated = true;
                await fs.writeFile(filePath, content);
                stats = await fs.stat(filePath);
                this.logger.info(`Migrated legacy file: ${legacyFilePath} → ${fileType}`);
                if (migrationWarnings) {
                  this.logger.warn(`Migration warnings for ${fileType}: ${migrationWarnings.join('; ')}`);
                }
              }
            }
          }
          if (!migrated) {
            content = getTemplateForFileType(fileType);
            await fs.writeFile(filePath, content);
            stats = await fs.stat(filePath);
            createdFiles.push(fileType as MemoryBankFileType);
            this.logger.info(`Created missing file from template: ${fileType}`);
          }
        }
        // If content or stats are still undefined, skip this fileType
        if (typeof content === 'undefined' || typeof stats === 'undefined') {
          this.logger.warn(`Could not load, migrate, or create file for ${fileType}. Skipping.`);
          continue;
        }
        // Validate file content after loading or creation
        const validation = validateFile(fileType, content);
        if (!validation.valid) {
          this.logger.warn(`Validation failed for ${fileType}: ${validation.errors?.join('; ')}`);
        }
        this.files.set(fileType as MemoryBankFileType, {
          type: fileType as MemoryBankFileType,
          content,
          lastUpdated: stats.mtime,
        });
      }
      this.ready = true;
      if (createdFiles.length > 0) {
        const msg = `Self-healing: Created missing files: ${createdFiles.join(", ")}`;
        this.logger.info(msg);
      }
      this.logger.info('Memory bank initialised successfully.');
      return createdFiles;
    } catch (err) {
      this.ready = false;
      this.logger.info(`Error loading memory bank files: ${err instanceof Error ? err.message : String(err)}`);
      throw err;
    }
  }

  /**
   * Returns true if the memory bank is ready (all files loaded and available).
   */
  isReady(): boolean {
    return this.ready;
  }

  /**
   * Gets a file by type.
   */
  getFile(type: MemoryBankFileType): MemoryBankFile | undefined {
    this.logger.info(`getFile called for: ${type}`);
    return this.files.get(type);
  }

  /**
   * Updates a file's content and refreshes its metadata.
   * Validates the new content before writing; throws if invalid.
   */
  async updateFile(type: MemoryBankFileType, content: string): Promise<void> {
    // Validate before writing
    const validation = validateFile(type, content);
    if (!validation.valid) {
      throw new Error(`Validation failed for ${type}: ${validation.errors?.join('; ')}`);
    }
    const filePath = path.join(this._memoryBankFolder, type);
    await fs.writeFile(filePath, content);
    const stats = await fs.stat(filePath);
    this.files.set(type as MemoryBankFileType, {
      type: type as MemoryBankFileType,
      content,
      lastUpdated: stats.mtime,
    });
    this.logger.info(`Updated file: ${type}`);
  }

  /**
   * Returns all loaded files as an array.
   */
  getAllFiles(): MemoryBankFile[] {
    return Array.from(this.files.values());
  }

  /**
   * Returns a string summary of all files and their contents (for debugging).
   */
  getFilesWithFilenames(): string {
    return Array.from(this.files.entries())
      .map(([type, file]) => `${type}:\nlast updated:${file.lastUpdated}\n\n${file.content}`)
      .join("\n\n");
  }
}
