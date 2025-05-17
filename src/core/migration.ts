import * as fs from "node:fs/promises";
import * as path from "node:path";
import { MemoryBankFileType } from "../types/types.js";
import { getTemplateForFileType } from "./templates.js";

/**
 * Migrates a legacy/flat memory bank file to the modular format.
 * Returns the migrated content and a flag indicating if migration was performed.
 * Does not write to disk—caller is responsible for saving the result.
 */
export async function migrateLegacyFile(filePath: string, fileType: MemoryBankFileType): Promise<{ migratedContent: string; wasMigrated: boolean; warnings?: string[] }> {
  // Only handle known legacy/flat file types for now
  const legacyFlatTypes = [
    MemoryBankFileType.ProjectBriefFlat,
    MemoryBankFileType.ProductContextFlat,
    MemoryBankFileType.ActiveContextFlat,
  ];
  if (!legacyFlatTypes.includes(fileType)) {
    return { migratedContent: '', wasMigrated: false, warnings: ['Not a recognised legacy/flat file type.'] };
  }
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    // For now, just wrap in the correct template if missing required headings
    const template = getTemplateForFileType(fileType.replace('Flat', '') as MemoryBankFileType);
    const missingHeadings = template
      .split('\n')
      .filter(line => line.startsWith('## '))
      .filter(heading => !content.includes(heading));
    const warnings: string[] = [];
    const migratedContent = missingHeadings.length > 0
      ? `${missingHeadings.join('\n')}\n${content}`
      : content;
    if (missingHeadings.length > 0) {
      warnings.push(`Added missing headings: ${missingHeadings.join(', ')}`);
    }
    return { migratedContent, wasMigrated: true, warnings: warnings.length ? warnings : undefined };
  } catch (err) {
    return { migratedContent: '', wasMigrated: false, warnings: [err instanceof Error ? err.message : String(err)] };
  }
}
