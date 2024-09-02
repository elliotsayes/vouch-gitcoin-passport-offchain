import { fetchAoBalance } from '../lib/ao-balance.js';
import { calculateConfidence } from '../lib/calc-confidence-value.js';
import { doVouch } from '../lib/index.js';
import { stethTimeValue } from '../lib/steth-mint.js';

const REGEX_ADDRESS = /[a-z0-9-_]{43}/i;

export function vouch(req, res) {
  const address = req.query.address;
  const callback = req.query.callback;
  console.log('Vouching for address:', address)
  console.log('Callback:', callback)

  if (!address || !REGEX_ADDRESS.test(address)) {
    return res.redirect(callback + '#/error?message=Invalid address')
  }

  fetchAoBalance({ address }).then((aoBalance) => {
    console.log('Balance:', aoBalance)
    if (aoBalance > 0) {
      const confidenceValue = calculateConfidence({ stethTimeValue, aoBalance })
      console.log('Confidence Value:', confidenceValue)
      if (isNaN(confidenceValue)) {
        return res.redirect(callback + '#/error?message=Invalid Confidence Value')
      }
      if (confidenceValue < 0.01) {
        return res.redirect(callback + '#/error?message=Insufficient AO Balance')
      }
      doVouch(address, confidenceValue).then(() => {
        res.redirect(callback + '#/success?address=' + address)
      }).catch((err) => {
        console.error('Error:', err)
        if(err.message === 'Already vouched!') {
          return res.redirect(callback + `#/success?address=${address}&message=${encodeURIComponent(err.message)}`)
        }
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