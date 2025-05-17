// Main entry point for the AI Memory CLI core logic
// British English spelling and clear, maintainable exports

// Memory bank service: all file IO, validation, self-healing
export { MemoryBankService } from "./memoryBank.js";

// Template provider: returns default content for each file type
export { getTemplateForFileType } from "./templates.js";

// Validation: Zod-based schemas and file validation function
export { validateFile } from "./validation.js";

// Migration: legacy/flat file migration utilities
export { migrateLegacyFile } from "./migration.js";
