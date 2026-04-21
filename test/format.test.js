import test from 'node:test';
import assert from 'node:assert/strict';

import { formatDuration } from '../src/utils/format.js';

test('formatDuration renders minutes and seconds', () => {
  assert.equal(formatDuration(65_000), '01:05');
});

test('formatDuration renders hours when needed', () => {
  assert.equal(formatDuration(3_726_000), '1:02:06');
});
