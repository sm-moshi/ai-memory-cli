// Transport manager for MCP server

// Import stdio server (runs as a background process)
import '../cli/stdioServer.js';
import { startHttpServer, stopHttpServer } from '../http/httpServer.js';

export async function startTransports() {
  // Start stdio transport
  console.log('Starting stdio transport...');
  // Stdio server runs on import

  // Start HTTP/SSE transport
  try {
    await startHttpServer();
    console.log('HTTP/SSE transport started.');
  } catch (err) {
    console.error('Failed to start HTTP/SSE transport:', err);
    process.exit(1);
  }
}

export async function stopTransports() {
  // Stop stdio transport (no-op for now)
  console.log('Stopping stdio transport...');

  // Stop HTTP/SSE transport
  try {
    await stopHttpServer();
    console.log('HTTP/SSE transport stopped.');
  } catch (err) {
    console.error('Failed to stop HTTP/SSE transport:', err);
  }
}
