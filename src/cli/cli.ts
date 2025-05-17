#!/usr/bin/env node
// AI Memory CLI entry point
// British English spelling and idiomatic Node.js

import { commandRouter } from "./commandRouter.js";

function printHelp() {
  console.log('AI Memory CLI\n\nUsage:\n  aimemory <command> [options]\n\nCommands:\n  init         Initialise a new memory bank\n  status       Show memory bank status\n  get <file>   Print the contents of a memory bank file\n  set <file>   Update the contents of a memory bank file\n  help         Show this help message\n');
}

export async function main() {
  const argv = process.argv.slice(2);
  const [command, ...args] = argv;

  if (!command || command === "help" || command === "--help" || command === "-h") {
    printHelp();
    process.exit(0);
  }

  try {
    await commandRouter(command, args);
  } catch (err) {
    console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
