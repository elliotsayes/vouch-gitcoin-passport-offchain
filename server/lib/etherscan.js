

export async function ethTokenAccountBalance({ token, address }) {
  const url = `https://api.etherscan.io/api?module=account&&action=tokenbalance&contractaddress=${token}&address=${address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`
  console.log(`Etherscan API: ${url}`)
  
  const response = await fetch(url)
  const data = await response.json()
  
  if (!data) {
    throw Error("No Data")
  }
  if (data.status === '0') {
    throw Error(`Error ${data.status}: ${data.message}`)
  }
  const balance = parseInt(data.result)
  return balance
}
