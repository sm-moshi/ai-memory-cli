// MCP server/agent-facing messages for AI Memory CLI

export const serverStarted = 'MCP server started.';
export const serverStopped = 'MCP server stopped.';

export function toolRegistered(tool: string) {
  return `Registered tool: ${tool}`;
}

export const errorInvalidRequest = 'Invalid request.';
export const errorInternal = 'Internal server error.';
