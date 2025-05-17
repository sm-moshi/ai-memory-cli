import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { startHttpServer, stopHttpServer } from '../../src/http/httpServer';

let serverStarted = false;

// Use a random port to avoid conflicts
const TEST_PORT = 9090;

describe('HTTP Server', () => {
  beforeEach(() => {
    serverStarted = false;
  });
  afterEach(async () => {
    if (serverStarted) {
      await stopHttpServer();
      serverStarted = false;
    }
  });

  it('should start HTTP server and respond to /health', async () => {
    await startHttpServer(TEST_PORT);
    serverStarted = true;
    // Use fetch to hit the health endpoint
    const res = await fetch(`http://localhost:${TEST_PORT}/health`);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('ok');
  });
});
