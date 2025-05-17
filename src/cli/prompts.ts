// CLI user-facing messages for AI Memory CLI
// British English spelling and maintainability

export const helpMessage =
  'AI Memory CLI\n\nUsage:\n  aimemory <command> [options]\n\nCommands:\n  init         Initialise a new memory bank\n  status       Show memory bank status\n  get <file>   Print the contents of a memory bank file\n  set <file>   Update the contents of a memory bank file\n  help         Show this help message\n';

export function memoryBankInitialised(files: string[]) {
  return `Initialised memory bank. Created files: ${files.join(', ')}`;
}

export const memoryBankAlreadyInitialised = 'Memory bank already initialised.';
export const memoryBankNotInitialised = 'Memory bank is not initialised. Run `aimemory init` first.';

export function fileNotFound(file: string) {
  return `File not found: ${file}`;
}

export function fileUpdated(file: string) {
  return `Updated file: ${file}`;
}

export function errorUnknownCommand(cmd: string) {
  return `Unknown command: ${cmd}`;
}

export const errorNoFileSpecified = "Error: No file specified.";

export function errorUnknownFileType(file: string) {
  return `Unknown file type: ${file}`;
}

export function errorValidationFailed(file: string, errors: string[]) {
  return `Validation failed for ${file}: ${errors.join('; ')}`;
}
