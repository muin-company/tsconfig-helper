import * as fs from 'fs';
import * as path from 'path';
import { TSConfig, OptionsDatabase } from './types.js';

export function loadTSConfig(filePath: string): TSConfig {
  const absolutePath = path.resolve(filePath);
  
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }
  
  const content = fs.readFileSync(absolutePath, 'utf-8');
  
  try {
    // Remove comments and trailing commas for parsing
    const cleaned = content
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/,(\s*[}\]])/g, '$1');
    
    return JSON.parse(cleaned);
  } catch (error) {
    throw new Error(`Invalid JSON in ${filePath}: ${error}`);
  }
}

export function loadOptionsDB(): OptionsDatabase {
  const dbPath = path.join(__dirname, 'options-db.json');
  const content = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(content);
}

export function formatValue(value: any): string {
  if (Array.isArray(value)) {
    return `[${value.join(', ')}]`;
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}
