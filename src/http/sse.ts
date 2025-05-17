// SSE logic for AI Memory CLI
// British English spelling and maintainability

import type { FastifyInstance } from 'fastify';

export function registerSse(server: FastifyInstance) {
  // GET /events - SSE endpoint
  server.get('/events', (request, reply) => {
    reply.raw.setHeader('Content-Type', 'text/event-stream');
    reply.raw.setHeader('Cache-Control', 'no-cache');
    reply.raw.setHeader('Connection', 'keep-alive');
    reply.raw.flushHeaders();

    // Send a test event every 2 seconds (placeholder)
    const interval = setInterval(() => {
      reply.raw.write(`data: { "message": "Hello from SSE!" }\n\n`);
    }, 2000);

    // Clean up on client disconnect
    request.raw.on('close', () => {
      clearInterval(interval);
    });
  });
}
