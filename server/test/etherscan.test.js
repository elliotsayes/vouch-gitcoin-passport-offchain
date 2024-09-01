import { test } from 'node:test'
import * as assert from 'assert'
import { stEthTokenAccountBalance, ethPrice } from '../lib/etherscan.js'

const stethAddress = process.env.ETH_STETH_CONTRACT
const testAddress = process.env.ETH_AO_MINT_CONTRACT

test('calculate steth balance', async () => {
  const balance = await stEthTokenAccountBalance({ token: stethAddress, address: testAddress });
  console.log('Balance:', balance)
  assert.ok(balance > 0);
});

test('calculate eth price', async () => {
  const price = await ethPrice();
  console.log('Price:', price)
  assert.ok(price > 0);
});