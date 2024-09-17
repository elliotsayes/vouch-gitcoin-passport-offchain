import { test } from 'node:test'
import * as assert from 'assert'
import { fetchSigningMessage, submitPassport } from '../lib/gitcoin.js'

const testAddress = '0xcC24E7B8412c1E6B44B7699BF0A1bA8d5a398705';

let signingMessage;

test('get signing message', async () => {
  signingMessage = await fetchSigningMessage();
  console.log(signingMessage)
  assert.ok(signingMessage.message);
  assert.ok(signingMessage.nonce);
});

test('submit passport rejects on fake signature', async () => {
  assert.rejects(() => submitPassport({ ethAddress: testAddress, signingSignature: {
    signature: 'fake',
    nonce: '123',
  } }));
});