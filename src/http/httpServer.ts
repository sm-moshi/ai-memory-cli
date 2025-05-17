// HTTP/SSE fallback server for AI Memory CLI
// British English spelling and maintainability
// You must install 'fastify' for this to work
import fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import { registerRoutes } from './routes.js';
import { registerSse } from './sse.js';

let server: FastifyInstance | undefined;

export async function startHttpServer(port = 8080) {
  server = fastify();
  // Register a basic health check route
  server.get('/health', async () => ({ status: 'ok' }));

  // Register real API routes and SSE logic
  registerRoutes(server);
  registerSse(server);

  try {
    await server.listen({ port });
    console.log(`HTTP/SSE server started on port ${port}`);
  } catch (err) {
    console.error('Failed to start HTTP/SSE server:', err);
    process.exit(1);
  }
}

export async function stopHttpServer() {
  if (server) {
    await server.close();
    console.log('HTTP/SSE server stopped.');
    server = undefined;
  }
}
