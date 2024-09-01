import { test } from 'node:test'
import * as assert from 'assert'
import { fetchAoBalance } from '../lib/ao-balance.js'

const testAddress = "0cQJ5Hd4oCaL57CWP-Pqe5_e0D4_ZDWuxKBgR9ke1SI"

test('calculate the balance of a user', async () => {
  const balance = await fetchAoBalance({ address: testAddress });
  console.log('Balance:', balance)
  assert.ok(balance > 0);
});
