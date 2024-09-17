const apiKey = process.env.GITCOIN_API_KEY
const scorerId = process.env.GITCOIN_SCORER_ID

const urlBase = 'https://api.scorer.gitcoin.co'

export async function fetchSigningMessage() {
  const url = `${urlBase}/registry/signing-message`
  console.log(`Gitcoin API: ${url}`)
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': `${apiKey}`
    },
  })
  const data = await response.json()
  
  if (!data) {
    throw Error("No Data")
  }
  if (typeof(data.message) !== 'string' || typeof(data.nonce) !== 'string') {
    throw Error("No Message")
  }

  return data
}

export async function submitPassport({ ethAddress, signingSignature }) {
  const url = `${urlBase}/registry/submit-passport`
  console.log(`Gitcoin API: ${url}`)
  
  const response = await fetch(url,
    {
      method: 'POST',
      headers: {
        'X-API-KEY': `${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "address": ethAddress,
        "scorer_id": scorerId,
        "signature": signingSignature.signature,
        "nonce": signingSignature.nonce
      })
    }
  )
  const data = await response.json()

  // Example response:
  // {
  //   "address": "{address}",
  //   "score": "{score}",
  //   "status": "DONE",
  //   "last_score_timestamp": "{last_score_time}",
  //   "expiration_date": "{expiration_time}",
  //   "evidence": null,
  //   "error": null,
  //   "stamp_scores": {
  //     "Ens": "2.2",
  //     "NFT": "0.69",
  //     "Google": "2.25"
  //     ...
  //   }
  // }
  
  if (!data) {
    throw Error("No Data")
  }
  if (data.error) {
    throw Error(`Passport Error: ${data.error}`)
  }

  return data
}