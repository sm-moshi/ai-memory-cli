// MCP stdio server for AI Memory CLI
// British English spelling and idiomatic Node.js

import { commandRouter } from "./commandRouter.js";

process.stdin.setEncoding('utf-8');

async function handleLine(line: string) {
  // Dynamic JSON input, so type is Record<string, unknown>
  let req: Record<string, unknown>;
  try {
    req = JSON.parse(line);
  } catch (err) {
    process.stdout.write(`${JSON.stringify({ error: 'Invalid JSON input.' })}\n`);
    return;
  }
  const command = req.command as string;
  const args = (req.args as string[]) || [];
  if (!command) {
    process.stdout.write(`${JSON.stringify({ error: 'Missing command.' })}\n`);
    return;
  }
  try {
    // For 'set', expect 'content' in the request
    if (command === 'set') {
      if (!args[0] || typeof req.content !== 'string') {
        process.stdout.write(`${JSON.stringify({ error: 'Missing file or content for set command.' })}\n`);
        return;
      }
      // Patch process.stdin for set (simulate as if content was piped)
      // Use a type assertion for process.stdin patching as this is a Node.js hack
      const oldStdin = process.stdin;
      const content = req.content as string;
      const chunks = [content];
      (process.stdin as NodeJS.ReadableStream & { [Symbol.asyncIterator]: () => AsyncIterableIterator<string> })[Symbol.asyncIterator] = async function* () {
        for (const chunk of chunks) {yield chunk;}
      };
      await commandRouter(command, args);
      process.stdin = oldStdin;
    } else {
      await commandRouter(command, args);
    }
    process.stdout.write(`${JSON.stringify({ ok: true })}\n`);
  } catch (err) {
    process.stdout.write(`${JSON.stringify({ error: err instanceof Error ? err.message : String(err) })}\n`);
  }
}

async function main() {
  // 'let' is required here because buffer is reassigned in the loop
  let buffer = '';
  for await (const chunk of process.stdin) {
    buffer += chunk;
    let lines = buffer.split('\n');
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (line.trim()) {await handleLine(line.trim());}
    }
  }
}

main();
