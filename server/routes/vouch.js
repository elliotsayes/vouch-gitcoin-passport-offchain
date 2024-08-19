import { aoBalance } from '../lib/ao-balance.js';
import { calculate } from '../lib/calc-confidence-value.js';
import { doVouch } from '../lib/index.js';

const REGEX_ADDRESS = /[a-z0-9-_]{43}/i;

export function vouch(req, res) {
  const address = req.query.address;
  const callback = req.query.callback;
  console.log('Vouching for address:', address)
  console.log('Callback:', callback)

  if (!address || !REGEX_ADDRESS.test(address)) {
    return res.redirect(callback + '#/error?message=Invalid address')
  }

  aoBalance({ address }).then((balance) => {
    console.log('Balance:', balance)
    if (balance > 0) {
      doVouch(address, calculate({ balance })).then(() => {
        res.redirect(callback + '#/success?address=' + address)
      }).catch((err) => {
        console.error('Error:', err)
        res.redirect(callback + '#/error?message=' + 'Error vouching: ' + err.message)
      })
    } else {
      res.redirect(callback + '#/error?message=Insufficient AO Balance')
    }
  }).catch((err) => {
    console.error('Error:', err)
    res.redirect(callback + '#/error?message=' + 'Error getting balance: ' + err.message)
  })
}