import { test } from 'node:test'
import * as assert from 'assert'
import { calculate } from '../lib/calc-confidence-value.js'

test('calculate the correct confidence value for some ao', () => {
  const value = calculate({ balance: 100_000_000_000 })
  assert.strictEqual(value, 5)
});
