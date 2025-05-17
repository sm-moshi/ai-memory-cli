// Core type definitions for the AI Memory CLI

/**
 * Enum for all supported memory bank file types (modular and legacy).
 */
export enum MemoryBankFileType {
  // Core
  ProjectBrief = "core/projectbrief.md",
  ProductContext = "core/productContext.md",
  ActiveContext = "core/activeContext.md",

  // System Patterns
  SystemPatternsIndex = "systemPatterns/index.md",
  SystemPatternsArchitecture = "systemPatterns/architecture.md",
  SystemPatternsPatterns = "systemPatterns/patterns.md",
  SystemPatternsScanning = "systemPatterns/scanning.md",

  // Tech Context
  TechContextIndex = "techContext/index.md",
  TechContextStack = "techContext/stack.md",
  TechContextDependencies = "techContext/dependencies.md",
  TechContextEnvironment = "techContext/environment.md",

  // Progress
  ProgressIndex = "progress/index.md",
  ProgressCurrent = "progress/current.md",
  ProgressHistory = "progress/history.md",

  // Legacy flat files (for migration/compatibility)
  ProjectBriefFlat = "projectbrief.md",
  ProductContextFlat = "productContext.md",
  ActiveContextFlat = "activeContext.md",
  SystemPatternsFlat = "systemPatterns.md",
  TechContextFlat = "techContext.md",
  ProgressFlat = "progress.md",
}

/**
 * Represents a single memory bank file and its metadata.
 */
export interface MemoryBankFile {
  type: MemoryBankFileType;
  content: string;
  lastUpdated?: Date;
}

/**
 * Interface for the memory bank service.
 */
export interface MemoryBank {
  files: Map<MemoryBankFileType, MemoryBankFile>;
  initializeFolders(): Promise<void>;
  loadFiles(): Promise<MemoryBankFileType[]>;
  getFile(type: MemoryBankFileType): MemoryBankFile | undefined;
  updateFile(type: MemoryBankFileType, content: string): Promise<void>;
  getAllFiles(): MemoryBankFile[];
  getFilesWithFilenames(): string;
}
