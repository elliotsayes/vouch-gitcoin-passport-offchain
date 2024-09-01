import { test } from 'node:test'
import * as assert from 'assert'
import { calculateConfidence } from '../lib/calc-confidence-value.js'

const exampleStethTimeValue = 27006452.051718235

test('calculate the correct confidence value for some ao', () => {
  const value = calculateConfidence({ stethTimeValue: exampleStethTimeValue, aoBalance: 0.4183 })
  console.log('Confidence Value:', value)
  assert.strictEqual(value, 8.150648552116694)
});
