import path from 'node:path';

export function normalisePath(p: string): string {
  return path.normalize(p).replace(/\\/g, '/');
}

export function hasExtension(filename: string, ext: string): boolean {
  return filename.endsWith(ext.startsWith('.') ? ext : `.${ext}`);
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
