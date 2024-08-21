import { test } from 'node:test'
import * as assert from 'assert'
import { ethTokenAccountBalance } from '../lib/etherscan.js'

const stethAddress = process.env.ETH_STETH_CONTRACT
const testAddress = process.env.ETH_AO_MINT_CONTRACT

test('calculate the balance of a user', async () => {
  const balance = await ethTokenAccountBalance({ token: stethAddress, address: testAddress });
  console.log('Balance:', balance)
  assert.ok(balance > 0);
});
