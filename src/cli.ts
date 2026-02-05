#!/usr/bin/env node

import { explainTSConfig } from './explain.js';
import { initTSConfig } from './init.js';
import { diffTSConfig } from './diff.js';
import { ProjectType } from './types.js';

const args = process.argv.slice(2);

function showHelp(): void {
  console.log(`
tsconfig-helper - Understand, compare, and generate tsconfig.json files

USAGE:
  tsconfig-helper <command> [options]

COMMANDS:
  explain [file]               Explain options in a tsconfig.json file
                               Default: ./tsconfig.json

  init --type <type> [output]  Generate a recommended tsconfig for your project type
                               Types: react, node, library, nextjs
                               Default output: ./tsconfig.json

  diff <file-a> <file-b>       Compare two tsconfig.json files

OPTIONS:
  --json                       Output in JSON format (for explain and diff)
  --help, -h                   Show this help message

EXAMPLES:
  tsconfig-helper explain
  tsconfig-helper explain tsconfig.prod.json --json
  tsconfig-helper init --type react
  tsconfig-helper init --type node --output tsconfig.build.json
  tsconfig-helper diff tsconfig.json tsconfig.prod.json
  tsconfig-helper diff tsconfig.a.json tsconfig.b.json --json
`);
}

function parseArgs() {
  const command = args[0];
  const options: Record<string, any> = {};
  const positional: string[] = [];

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];
      
      if (nextArg && !nextArg.startsWith('--')) {
        options[key] = nextArg;
        i++;
      } else {
        options[key] = true;
      }
    } else if (arg.startsWith('-')) {
      options[arg.slice(1)] = true;
    } else {
      positional.push(arg);
    }
  }

  return { command, options, positional };
}

function main(): void {
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  const { command, options, positional } = parseArgs();

  try {
    switch (command) {
      case 'explain': {
        const file = positional[0] || './tsconfig.json';
        explainTSConfig(file, !!options.json);
        break;
      }

      case 'init': {
        const type = options.type as ProjectType;
        const output = positional[0] || './tsconfig.json';
        
        if (!type) {
          console.error('❌ Error: --type is required for init command');
          console.error('   Available types: react, node, library, nextjs');
          process.exit(1);
        }
        
        initTSConfig(type, output);
        break;
      }

      case 'diff': {
        if (positional.length < 2) {
          console.error('❌ Error: diff requires two file paths');
          console.error('   Usage: tsconfig-helper diff <file-a> <file-b>');
          process.exit(1);
        }
        
        diffTSConfig(positional[0], positional[1], !!options.json);
        break;
      }

      default:
        console.error(`❌ Unknown command: ${command}`);
        console.error('   Run `tsconfig-helper --help` for usage information');
        process.exit(1);
    }
  } catch (error) {
    console.error(`\n❌ Error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

main();
