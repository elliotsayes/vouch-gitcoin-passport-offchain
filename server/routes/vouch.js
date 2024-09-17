import { submitPassport } from '../lib/gitcoin.js'
import { calculateConfidence } from '../lib/calc-confidence-value.js';
import { doVouch } from '../lib/index.js';

const REGEX_AR_ADDRESS = /[a-z0-9-_]{43}/i;

export function vouch(req, res) {
  const arAddress = req.query.arAddress;
  const ethAddress = req.query.ethAddress;
  const signingSignature = decodeURIComponent(JSON.parse(req.query.signingSignature));
  const callback = req.query.callback;
  console.log('Vouching for Ar Address:', arAddress)
  console.log('Vouch using Eth Address:', arAddress)
  console.log('Signing Signature:', signingSignature)
  console.log('Callback:', callback)

  if (!arAddress || !REGEX_AR_ADDRESS.test(arAddress)) {
    return res.redirect(callback + '#/error?message=Invalid Arweave Address')
  }

  submitPassport({ ethAddress, signingSignature }).then((passportResponse) => {
    console.log('passportResponse:', passportResponse)
    
    const confidenceValue = calculateConfidence(passportResponse)
    console.log('Confidence Value:', confidenceValue)
    if (isNaN(confidenceValue)) {
      return res.redirect(callback + '#/error?message=Invalid Confidence Value')
    }
    if (confidenceValue < 0.01) {
      return res.redirect(callback + '#/error?message=Insufficient Passport Score')
    }
    doVouch(arAddress, confidenceValue).then(() => {
      res.redirect(callback + '#/success?address=' + arAddress)
    }).catch((err) => {
      console.error('Error:', err)
      if(err.message === 'Already vouched!') {
        return res.redirect(callback + `#/success?address=${arAddress}&message=${encodeURIComponent(err.message)}`)
      }
      res.redirect(callback + '#/error?message=' + 'Error vouching: ' + err.message)
    })
  }).catch((err) => {
    console.error('Error:', err)
    res.redirect(callback + '#/error?message=' + 'Error getting passport: ' + err.message)
  })
}