import { stEthTokenAccountBalance, ethPrice } from './etherscan.js';

const stethAddress = process.env.ETH_STETH_CONTRACT
const aoMintAddress = process.env.ETH_AO_MINT_CONTRACT

const interestRate = 0.1;
const timePeriodYears = 0.66;

async function fetchStethTimeValue() {
  const balance = await stEthTokenAccountBalance({
    token: stethAddress,
    address: aoMintAddress,
  });
  console.log('StEth Balance:', balance)

  const price = await ethPrice();
  console.log('ETH Price:', price)

  const stethValue = balance * price;
  console.log('StEth Value:', stethValue)

  const timeValue = stethValue * interestRate * timePeriodYears;
  console.log('StEth Time-Value:', timeValue)

  return timeValue
}


export let stethTimeValue = 0;

export async function updateStethTimeValue() {
  stethTimeValue = await fetchStethTimeValue()
  console.log('stethTimeValue:', stethTimeValue)
}
