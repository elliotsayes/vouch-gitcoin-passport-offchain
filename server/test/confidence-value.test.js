import { test } from 'node:test'
import * as assert from 'assert'
import { calculateConfidence } from '../lib/calc-confidence-value.js'

const exampleBridgedTimeValue = 27006452.051718235
const exampleAoBalance = 0.4183
const exampleTime = new Date('2024-09-09T10:04:05.616Z')

test('calculate the correct confidence value for some ao', () => {
  const value = calculateConfidence({
    bridgedTimeValue: exampleBridgedTimeValue,
    aoBalance: exampleAoBalance,
    now: exampleTime,
  })
  console.log('Confidence Value:', value)
  assert.ok(value > 15.25)
  assert.ok(value < 15.26)
});
