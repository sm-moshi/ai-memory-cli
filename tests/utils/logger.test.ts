import { describe, it, expect, vi } from 'vitest';
import { logger } from '../../src/utils/logger';

describe('Logger', () => {
  it('should log info messages to console', () => {
    let output = '';
    vi.spyOn(console, 'info').mockImplementation((...args) => { output += args.join(' '); });
    logger.info('Test info message');
    expect(output).toContain('Test info message');
    vi.restoreAllMocks();
  });

  it('should filter log levels', () => {
    logger.setLevel('warn');
    let infoCalled = false;
    let warnCalled = false;
    vi.spyOn(console, 'info').mockImplementation(() => { infoCalled = true; });
    vi.spyOn(console, 'warn').mockImplementation(() => { warnCalled = true; });
    logger.info('Should not log');
    logger.warn('Should log');
    expect(infoCalled).toBe(false);
    expect(warnCalled).toBe(true);
    logger.setLevel('info'); // Reset
    vi.restoreAllMocks();
  });
});
