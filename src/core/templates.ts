import { MemoryBankFileType } from "../types/types.js";

/**
 * Returns the default template for a given memory bank file type.
 * All templates use British English spelling and are designed for maintainability.
 */
export function getTemplateForFileType(fileType: MemoryBankFileType): string {
  switch (fileType) {
    // Core
    case MemoryBankFileType.ProjectBrief:
      return '# Project Brief\n\n*Foundation document that shapes all other files*\n\n## Core Requirements\n\n## Project Goals\n\n## Project Scope\n';
    case MemoryBankFileType.ProductContext:
      return '# Product Context\n\n## Why this project exists\n\n## Problems it solves\n\n## How it should work\n\n## User experience goals\n';
    case MemoryBankFileType.ActiveContext:
      return '# Active Context\n\n## Current work focus\n\n## Recent changes\n\n## Next steps\n\n## Active decisions and considerations\n';
    // System Patterns
    case MemoryBankFileType.SystemPatternsIndex:
      return '# System Patterns Index\n\n*Summary of system patterns and architecture*\n';
    case MemoryBankFileType.SystemPatternsArchitecture:
      return '# System Architecture\n\n*Describe the overall system architecture here*\n';
    case MemoryBankFileType.SystemPatternsPatterns:
      return '# Patterns\n\n*List and describe design patterns in use*\n';
    case MemoryBankFileType.SystemPatternsScanning:
      return '# Scanning\n\n*Describe scanning or analysis patterns here*\n';
    // Tech Context
    case MemoryBankFileType.TechContextIndex:
      return '# Tech Context Index\n\n*Summary of technology stack and constraints*\n';
    case MemoryBankFileType.TechContextStack:
      return '# Technology Stack\n\n*List all major technologies used*\n';
    case MemoryBankFileType.TechContextDependencies:
      return '# Dependencies\n\n*List and describe project dependencies*\n';
    case MemoryBankFileType.TechContextEnvironment:
      return '# Environment\n\n*Describe the development and production environments*\n';
    // Progress
    case MemoryBankFileType.ProgressIndex:
      return '# Progress Index\n\n*Summary of project progress*\n';
    case MemoryBankFileType.ProgressCurrent:
      return '# Current Progress\n\n*Describe current work, blockers, and next steps*\n';
    case MemoryBankFileType.ProgressHistory:
      return '# Progress History\n\n*Log of past progress and milestones*\n';
    // Legacy flat files (for migration/compatibility)
    case MemoryBankFileType.ProjectBriefFlat:
      return '# Project Brief\n\n*Foundation document that shapes all other files*\n\n## Core Requirements\n\n## Project Goals\n\n## Project Scope\n';
    case MemoryBankFileType.ProductContextFlat:
      return '# Product Context\n\n## Why this project exists\n\n## Problems it solves\n\n## How it should work\n\n## User experience goals\n';
    case MemoryBankFileType.ActiveContextFlat:
      return '# Active Context\n\n## Current work focus\n\n## Recent changes\n\n## Next steps\n\n## Active decisions and considerations\n';
    case MemoryBankFileType.SystemPatternsFlat:
      return '# System Patterns\n\n## System architecture\n\n## Key technical decisions\n\n## Design patterns in use\n\n## Component relationships\n';
    case MemoryBankFileType.TechContextFlat:
      return '# Tech Context\n\n## Technologies used\n\n## Development setup\n\n## Technical constraints\n\n## Dependencies\n';
    case MemoryBankFileType.ProgressFlat:
      return '# Progress\n\n## What works\n\n## What\'s left to build\n\n## Current status\n\n## Known issues\n';
    default:
      return '# Memory Bank File\n\n*This is a default template*\n';
  }
}
