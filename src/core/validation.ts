import { z } from "zod";
import { MemoryBankFileType } from "../types/types.js";

/**
 * Zod schemas for validating the structure of memory bank files.
 * These schemas check for required sections/headings in each file type.
 * Extend as needed for more detailed validation.
 */

// Helper: Checks that all required headings are present in the content
function hasRequiredHeadings(content: string, headings: string[]): boolean {
  return headings.every(h => content.includes(h));
}

// Project Brief schema: requires three main headings
export const ProjectBriefSchema = z.string().refine(
  (content) => hasRequiredHeadings(content, [
    "## Core Requirements",
    "## Project Goals",
    "## Project Scope"
  ]),
  {
    message: "Project Brief must include headings: Core Requirements, Project Goals, Project Scope."
  }
);

// Product Context schema: requires three main headings
export const ProductContextSchema = z.string().refine(
  (content) => hasRequiredHeadings(content, [
    "## Why this project exists",
    "## Problems it solves",
    "## How it should work",
    "## User experience goals"
  ]),
  {
    message: "Product Context must include headings: Why this project exists, Problems it solves, How it should work, User experience goals."
  }
);

// Active Context schema: requires four main headings
export const ActiveContextSchema = z.string().refine(
  (content) => hasRequiredHeadings(content, [
    "## Current work focus",
    "## Recent changes",
    "## Next steps",
    "## Active decisions and considerations"
  ]),
  {
    message: "Active Context must include headings: Current work focus, Recent changes, Next steps, Active decisions and considerations."
  }
);

// Add more schemas for other file types as needed...

/**
 * Validates a file's content against its schema (if defined).
 * Returns { valid: boolean, errors?: string[] }
 */
export function validateFile(fileType: MemoryBankFileType, content: string): { valid: boolean; errors?: string[] } {
  switch (fileType) {
    case MemoryBankFileType.ProjectBrief:
    case MemoryBankFileType.ProjectBriefFlat: {
      const result = ProjectBriefSchema.safeParse(content);
      return result.success ? { valid: true } : { valid: false, errors: result.error.errors.map(e => e.message) };
    }
    case MemoryBankFileType.ProductContext:
    case MemoryBankFileType.ProductContextFlat: {
      const result = ProductContextSchema.safeParse(content);
      return result.success ? { valid: true } : { valid: false, errors: result.error.errors.map(e => e.message) };
    }
    case MemoryBankFileType.ActiveContext:
    case MemoryBankFileType.ActiveContextFlat: {
      const result = ActiveContextSchema.safeParse(content);
      return result.success ? { valid: true } : { valid: false, errors: result.error.errors.map(e => e.message) };
    }
    // Add more cases for other file types as schemas are defined
    default:
      // No schema: always valid
      return { valid: true };
  }
}
