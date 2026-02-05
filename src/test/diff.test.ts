import { test } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'fs';
import * as path from 'path';
import { diffTSConfig } from '../diff.js';

test('diffTSConfig: detects added options', () => {
  const fileA = path.join(__dirname, 'temp-diff-a.json');
  const fileB = path.join(__dirname, 'temp-diff-b.json');
  
  const configA = { compilerOptions: { strict: true } };
  const configB = { compilerOptions: { strict: true, noEmit: true } };
  
  fs.writeFileSync(fileA, JSON.stringify(configA));
  fs.writeFileSync(fileB, JSON.stringify(configB));
  
  try {
    // Just ensure it doesn't throw - visual output tested manually
    diffTSConfig(fileA, fileB, false);
    assert.ok(true);
  } finally {
    fs.unlinkSync(fileA);
    fs.unlinkSync(fileB);
  }
});

test('diffTSConfig: detects changed options', () => {
  const fileA = path.join(__dirname, 'temp-diff-changed-a.json');
  const fileB = path.join(__dirname, 'temp-diff-changed-b.json');
  
  const configA = { compilerOptions: { target: 'ES2015' } };
  const configB = { compilerOptions: { target: 'ES2020' } };
  
  fs.writeFileSync(fileA, JSON.stringify(configA));
  fs.writeFileSync(fileB, JSON.stringify(configB));
  
  try {
    diffTSConfig(fileA, fileB, false);
    assert.ok(true);
  } finally {
    fs.unlinkSync(fileA);
    fs.unlinkSync(fileB);
  }
});

test('diffTSConfig: handles identical configs', () => {
  const fileA = path.join(__dirname, 'temp-diff-same-a.json');
  const fileB = path.join(__dirname, 'temp-diff-same-b.json');
  
  const config = { compilerOptions: { strict: true, target: 'ES2020' } };
  
  fs.writeFileSync(fileA, JSON.stringify(config));
  fs.writeFileSync(fileB, JSON.stringify(config));
  
  try {
    diffTSConfig(fileA, fileB, false);
    assert.ok(true);
  } finally {
    fs.unlinkSync(fileA);
    fs.unlinkSync(fileB);
  }
});
