import { dryrun } from "@permaweb/aoconnect"
import { bigintDivide } from "./bigint.js";

const AO_TOKEN = process.env.AO_TOKEN || "m3PaWzK4PTG9lAaqYQPaPdOcXdO8hYqi5Fe9NWqXd0w"
const ARMSTRONG_MULTIPLIER = BigInt(10) ** BigInt(12) // 10^12 -- 1 Trillion

export async function fetchAoBalance({ address }) {
  const balanceResult = await dryrun({
    process: AO_TOKEN,
    tags: [
      { name: 'Action', value: 'Balance' },
      { name: 'Recipient', value: address }
    ]
  });
  if (balanceResult.Error) {
    throw new Error(`Error with AO: ${reply.Error}`)
  }
  const reply = balanceResult.Messages[0];
  if (reply === undefined) {
    throw new Error(`No reply from AO`)
  }
  const balanceTag = reply.Tags.find(tag => tag.name === 'Balance');
  if (balanceTag === undefined) {
    throw new Error(`No balance in reply from AO`)
  }
  const balanceArmstrong = BigInt(balanceTag.value);
  const balance = bigintDivide(balanceArmstrong, ARMSTRONG_MULTIPLIER, 5);
  
  return balance;
}
