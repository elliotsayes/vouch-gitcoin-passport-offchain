import { bigintDivide } from "./bigint.js"

const WEI_MULTIPLIER = BigInt(10) ** BigInt(18)

export async function stEthTokenAccountBalance({ token, address }) {
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
  const balanceWei = data.result

  const balance = bigintDivide(balanceWei, WEI_MULTIPLIER, 5)
  return balance
}

export async function ethPrice() {
  const url = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`
  console.log(`Etherscan API: ${url}`)
  
  const response = await fetch(url)
  const data = await response.json()
  
  if (!data) {
    throw Error("No Data")
  }
  if (data.status === '0') {
    throw Error(`Error ${data.status}: ${data.message}`)
  }
  return data.result.ethusd
}