import { fetchSigningMessage } from "../lib/gitcoin.js";

export function signingMessage(req, res) {
  const callback = req.query.callback;
  const arAddress = req.query.arAddress;
  console.log('Callback:', callback)
  console.log('Ar Address:', arAddress)

  fetchSigningMessage().then((signingMessage) => {
    return res.redirect(callback + `#/verify-passport?arAddress=${arAddress}&signingMessage=${
      encodeURIComponent(JSON.stringify(signingMessage))}`)
  }).catch((err) => {
    console.error('Error:', err)
    return res.redirect(callback + '#/error?message=' + 'Error getting signing message: ' + err.message)
  });
}