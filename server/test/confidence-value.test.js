import { test } from 'node:test'
import * as assert from 'assert'
import { calculateConfidence } from '../lib/calc-confidence-value.js'

const exampleBridgedTimeValue = 8901040.286437832
const exampleAoBalance = 0.4183
const exampleAoTokenSupply = 1855944.4254394532

test('calculate the correct confidence value for some ao', () => {
  const value = calculateConfidence({
    bridgedTimeValue: exampleBridgedTimeValue,
    aoBalance: exampleAoBalance,
    aoTokenSupply: exampleAoTokenSupply,
  })
  console.log('Confidence Value:', value)
  assert.strictEqual(value, 4.387343718669507)
});
