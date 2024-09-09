export async function duneQuery({ queryId, limit = 1 }) {
  const url = `https://api.dune.com/api/v1/query/${queryId}/results?limit=${limit}`
  console.log(`Dune API: ${url}`)
  
  const response = await fetch(url, {
    headers: {
      'X-Dune-Api-Key': process.env.DUNE_API_KEY
    }
  })
  const data = await response.json()
  
  if (!data) {
    throw Error("No Data")
  }
  if (data.status === '0') {
    throw Error(`Error ${data.status}: ${data.message}`)
  }
  const daiValueUsd = data.result.rows[0].Accum_NetDAI
  
  return daiValueUsd
}