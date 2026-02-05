import { test } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { initTSConfig } from '../init.js';

test('initTSConfig: creates React config', () => {
  const tempFile = path.join(__dirname, 'temp-react-tsconfig.json');
  
  try {
    initTSConfig('react', tempFile);
    assert.ok(fs.existsSync(tempFile));
    
    const content = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    assert.strictEqual(content.compilerOptions.jsx, 'react-jsx');
    assert.ok(content.compilerOptions.lib.includes('DOM'));
  } finally {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
});

test('initTSConfig: creates Node config', () => {
  const tempFile = path.join(__dirname, 'temp-node-tsconfig.json');
  
  try {
    initTSConfig('node', tempFile);
    assert.ok(fs.existsSync(tempFile));
    
    const content = JSON.parse(fs.readFileSync(tempFile, 'utf-8'));
    assert.strictEqual(content.compilerOptions.module, 'commonjs');
    assert.strictEqual(content.compilerOptions.declaration, true);
  } finally {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
});

test('initTSConfig: throws error if file exists', () => {
  const tempFile = path.join(__dirname, 'temp-existing-tsconfig.json');
  fs.writeFileSync(tempFile, '{}');
  
  try {
    assert.throws(
      () => initTSConfig('react', tempFile),
      /File already exists/
    );
  } finally {
    fs.unlinkSync(tempFile);
  }
});

test('initTSConfig: throws error for unknown type', () => {
  assert.throws(
    () => initTSConfig('unknown' as any, './temp.json'),
    /Unknown project type/
  );
});
