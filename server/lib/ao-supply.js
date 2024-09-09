import { dryrun } from "@permaweb/aoconnect"
import { bigintDivide } from "./bigint.js";

const AO_TOKEN = process.env.AO_TOKEN_SUPPLY || "ptCu-Un-3FF8sZ5zNMYg43zRgSYAGVkjz2Lb0HZmx2M"
const ARMSTRONG_MULTIPLIER = BigInt(10) ** BigInt(12) // 10^12 -- 1 Trillion

export async function fetchAoSupply() {
  const supplyResult = await dryrun({
    process: AO_TOKEN,
    Owner: "1234",
    tags: [
      { name: 'Action', value: 'Minted-Supply' },
    ],
    data: "1234",
  });
  if (supplyResult.Error) {
    throw new Error(`Error with AO: ${reply.Error}`)
  }
  const reply = supplyResult.Messages[0];
  if (reply === undefined) {
    throw new Error(`No reply from AO`)
  }
  const supplyData = reply.Data;
  if (supplyData === undefined) {
    throw new Error(`No supply in reply from AO`)
  }
  const supplyArmstrong = BigInt(supplyData);
  const supply = bigintDivide(supplyArmstrong, ARMSTRONG_MULTIPLIER, 5);
  
  return supply;
}


export let aoTokenSupply = 0;

export async function updateAoTokenSupply() {
  aoTokenSupply = await fetchAoSupply()
  console.log('aoTokenSupply:', aoTokenSupply)
}
