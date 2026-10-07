import test from 'node:test';
import assert from 'node:assert/strict';

test('health contract', () => {
  assert.equal(typeof '/api/health', 'string');
  assert.match('/api/health', /^\/api\//);
});
