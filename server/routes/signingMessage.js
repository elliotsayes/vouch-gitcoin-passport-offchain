import { fetchSigningMessage } from "../lib/gitcoin.js";

export function signingMessage(req, res) {
  const callback = req.query.callback;
  console.log('Callback:', callback)

  fetchSigningMessage().then((signingMessage) => {
    return res.redirect(callback + '#/verify-passport?signingMessage=' + encodeURIComponent(JSON.stringify(signingMessage)))
  }).catch((err) => {
    console.error('Error:', err)
    return res.redirect(callback + '#/error?message=' + 'Error getting signing message: ' + err.message)
  });
}