import { test } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { loadTSConfig, formatValue } from '../utils.js';

test('formatValue: formats different types correctly', () => {
  assert.strictEqual(formatValue('string'), 'string');
  assert.strictEqual(formatValue(42), '42');
  assert.strictEqual(formatValue(true), 'true');
  assert.strictEqual(formatValue(['a', 'b', 'c']), '[a, b, c]');
  assert.strictEqual(formatValue({ key: 'value' }), JSON.stringify({ key: 'value' }, null, 2));
});

test('loadTSConfig: throws error for non-existent file', () => {
  assert.throws(
    () => loadTSConfig('/nonexistent/file.json'),
    /File not found/
  );
});

test('loadTSConfig: parses valid tsconfig', () => {
  const tempFile = path.join(__dirname, 'temp-test-config.json');
  const testConfig = {
    compilerOptions: {
      strict: true,
      target: 'ES2020'
    }
  };
  
  fs.writeFileSync(tempFile, JSON.stringify(testConfig, null, 2));
  
  try {
    const loaded = loadTSConfig(tempFile);
    assert.deepStrictEqual(loaded, testConfig);
  } finally {
    fs.unlinkSync(tempFile);
  }
});

test('loadTSConfig: handles comments and trailing commas', () => {
  const tempFile = path.join(__dirname, 'temp-test-config-comments.json');
  const content = `{
  // This is a comment
  "compilerOptions": {
    "strict": true, // inline comment
    "target": "ES2020",
  },
  /* Block comment */
}`;
  
  fs.writeFileSync(tempFile, content);
  
  try {
    const loaded = loadTSConfig(tempFile);
    assert.ok(loaded.compilerOptions);
    assert.strictEqual(loaded.compilerOptions.strict, true);
    assert.strictEqual(loaded.compilerOptions.target, 'ES2020');
  } finally {
    fs.unlinkSync(tempFile);
  }
});
