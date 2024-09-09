import { ercTokenAccountBalance, ethPrice } from './etherscan.js';
import { duneQuery } from './dune.js';

const stethAddress = process.env.ETH_STETH_CONTRACT
const aoMintAddress = process.env.ETH_AO_MINT_CONTRACT

const interestRate = 0.1;

// June 18 2024
const bridgeStartTime = new Date(2024, 5, 18).getTime();
// Feb 1 2025
export const preTradeEndTime = new Date(2025, 1, 1).getTime();

async function fetchBridgedTimeValue() {
  const now = new Date().getTime();
  const timeElapsedYears = (now - bridgeStartTime) / (1000 * 60 * 60 * 24 * 365);
  
  const balance = await ercTokenAccountBalance({
    token: stethAddress,
    address: aoMintAddress,
  });
  console.log('StEth Balance:', balance)

  const price = await ethPrice();
  console.log('ETH Price:', price)

  const stethValue = balance * price;
  console.log('StEth Value:', stethValue)

  const stethTimeValue = stethValue * interestRate * timeElapsedYears;
  console.log('StEth Time-Value:', stethTimeValue)

  const daiValue = await duneQuery({ queryId: '4028479' })
  console.log('DAI Value:', daiValue)

  const daiTimeValue = daiValue * interestRate * timeElapsedYears;
  console.log('DAI Time-Value:', daiTimeValue)

  const bridgedTimeValue = stethTimeValue + daiTimeValue;
  console.log('Total Bridged Time-Value:', bridgedTimeValue)

  return bridgedTimeValue
}


export let bridgedTimeValue = 0;

export async function updateBridgedTimeValue() {
  bridgedTimeValue = await fetchBridgedTimeValue()
  console.log('bridgedTimeValue:', bridgedTimeValue)
}
