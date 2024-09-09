import { test } from 'node:test'
import * as assert from 'assert'
import { calculateConfidence } from '../lib/calc-confidence-value.js'

const exampleBridgedTimeValue = 27006452.051718235
const exampleAoBalance = 0.4183
const exampleAoTokenSupply = 1855692.1321972655

test('calculate the correct confidence value for some ao', () => {
  const value = calculateConfidence({
    bridgedTimeValue: exampleBridgedTimeValue,
    aoBalance: exampleAoBalance,
    aoTokenSupply: exampleAoTokenSupply,
  })
  console.log('Confidence Value:', value)
  assert.strictEqual(value, 13.314179947953184)
});
