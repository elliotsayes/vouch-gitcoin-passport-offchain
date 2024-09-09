import { ercTokenAccountBalance, ethPrice } from './etherscan.js';
import { duneQuery } from './dune.js';

const stethAddress = process.env.ETH_STETH_CONTRACT
const aoMintAddress = process.env.ETH_AO_MINT_CONTRACT

const interestRate = 0.1;
const timePeriodYears = 0.66;

async function fetchBridgedTimeValue() {
  const balance = await ercTokenAccountBalance({
    token: stethAddress,
    address: aoMintAddress,
  });
  console.log('StEth Balance:', balance)

  const price = await ethPrice();
  console.log('ETH Price:', price)

  const stethValue = balance * price;
  console.log('StEth Value:', stethValue)

  const stethTimeValue = stethValue * interestRate * timePeriodYears;
  console.log('StEth Time-Value:', stethTimeValue)

  const daiValue = await duneQuery({ queryId: '4028479' })
  console.log('DAI Value:', daiValue)

  const daiTimeValue = daiValue * interestRate * timePeriodYears;
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
