import { fetchSigningMessage } from "../lib/gitcoin.js";

export function signingMessage(req, res) {
  fetchSigningMessage().then((signingMessage) => {
    res.json(signingMessage)
  }).catch((err) => {
    console.error('Error:', err)
    res.status(500).json({ error: err.message })
  });
}