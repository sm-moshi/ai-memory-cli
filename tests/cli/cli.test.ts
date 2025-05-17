import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { main } from '../../src/cli/cli';
import * as commandRouterModule from '../../src/cli/commandRouter';

describe('CLI', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should parse CLI arguments and route to commandRouter', async () => {
    const argv = process.argv;
    process.argv = ['node', 'aimemory', 'init'];
    let called = false;
    vi.spyOn(commandRouterModule, 'commandRouter').mockImplementation(async () => { called = true; });
    // Mock process.exit to prevent exiting
    vi.spyOn(process, 'exit').mockImplementation(((code?: unknown) => { throw new Error('exit'); }) as (code?: unknown) => never);
    try {
      await main();
    } catch {}
    expect(called).toBe(true);
    process.argv = argv;
  });

  it('should print help for no command', async () => {
    const argv = process.argv;
    process.argv = ['node', 'aimemory'];
    let output = '';
    vi.spyOn(console, 'log').mockImplementation((msg) => { output += msg; });
    vi.spyOn(process, 'exit').mockImplementation(((code?: unknown) => { throw new Error('exit'); }) as (code?: unknown) => never);
    try {
      await main();
    } catch {}
    expect(output).toContain('AI Memory CLI');
    process.argv = argv;
  });

  it('should error for unknown command', async () => {
    const argv = process.argv;
    process.argv = ['node', 'aimemory', 'unknowncmd'];
    let error = '';
    vi.spyOn(console, 'error').mockImplementation((msg) => { error += msg; });
    let exitCode: unknown = undefined;
    vi.spyOn(process, 'exit').mockImplementation(((code?: unknown) => { exitCode = code; throw new Error('exit'); }) as (code?: unknown) => never);
    try {
      await main();
    } catch {}
    expect(error).toContain('Unknown command');
    expect(exitCode).toBe(1);
    process.argv = argv;
  });
});
