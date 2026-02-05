import { loadTSConfig, formatValue } from './utils.js';
import { TSConfig } from './types.js';

interface DiffItem {
  option: string;
  fileA?: any;
  fileB?: any;
  status: 'added' | 'removed' | 'changed' | 'same';
}

export function diffTSConfig(fileA: string, fileB: string, outputJson: boolean = false): void {
  const configA = loadTSConfig(fileA);
  const configB = loadTSConfig(fileB);
  
  const diffs: DiffItem[] = [];
  
  // Flatten config for comparison
  const flatA = flattenConfig(configA);
  const flatB = flattenConfig(configB);
  
  // Find all unique keys
  const allKeys = new Set([...Object.keys(flatA), ...Object.keys(flatB)]);
  
  for (const key of Array.from(allKeys).sort()) {
    const valueA = flatA[key];
    const valueB = flatB[key];
    
    if (valueA === undefined && valueB !== undefined) {
      diffs.push({ option: key, fileB: valueB, status: 'added' });
    } else if (valueA !== undefined && valueB === undefined) {
      diffs.push({ option: key, fileA: valueA, status: 'removed' });
    } else if (JSON.stringify(valueA) !== JSON.stringify(valueB)) {
      diffs.push({ option: key, fileA: valueA, fileB: valueB, status: 'changed' });
    } else {
      diffs.push({ option: key, fileA: valueA, fileB: valueB, status: 'same' });
    }
  }
  
  if (outputJson) {
    console.log(JSON.stringify(diffs, null, 2));
  } else {
    console.log(`\n🔍 TSConfig Diff: ${fileA} ↔️  ${fileB}\n`);
    console.log('═'.repeat(60));
    
    const added = diffs.filter(d => d.status === 'added');
    const removed = diffs.filter(d => d.status === 'removed');
    const changed = diffs.filter(d => d.status === 'changed');
    const same = diffs.filter(d => d.status === 'same');
    
    if (added.length > 0) {
      console.log(`\n➕ Added in ${fileB} (${added.length}):`);
      for (const item of added) {
        console.log(`   ${item.option}: ${formatValue(item.fileB)}`);
      }
    }
    
    if (removed.length > 0) {
      console.log(`\n➖ Removed from ${fileB} (${removed.length}):`);
      for (const item of removed) {
        console.log(`   ${item.option}: ${formatValue(item.fileA)}`);
      }
    }
    
    if (changed.length > 0) {
      console.log(`\n🔄 Changed (${changed.length}):`);
      for (const item of changed) {
        console.log(`   ${item.option}:`);
        console.log(`      ${fileA}: ${formatValue(item.fileA)}`);
        console.log(`      ${fileB}: ${formatValue(item.fileB)}`);
      }
    }
    
    console.log('\n' + '═'.repeat(60));
    console.log(`\n📊 Summary: ${added.length} added, ${removed.length} removed, ${changed.length} changed, ${same.length} same\n`);
  }
}

function flattenConfig(config: TSConfig, prefix: string = ''): Record<string, any> {
  const result: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(config)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenConfig(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  
  return result;
}
