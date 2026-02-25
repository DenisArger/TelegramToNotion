const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('index.js contains key command handlers', () => {
  const src = fs.readFileSync('index.js', 'utf8');
  assert.ok(src.includes('/start'));
  assert.ok(src.includes('/addrecord'));
});
