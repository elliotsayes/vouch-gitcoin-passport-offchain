import { dryrun } from "@permaweb/aoconnect"
import { bigintDivide } from "./bigint.js";

const AO_TOKEN = process.env.AO_TOKEN || "Pi-WmAQp2-mh-oWH9lWpz5EthlUDj_W0IusAv-RXhRk"
const ARMSTRONG_MULTIPLIER = BigInt(10) ** BigInt(12) // 10^12 -- 1 Trillion

export async function fetchAoBalance({ address }) {
  const balanceResult = await dryrun({
    process: AO_TOKEN,
    Owner: "1234",
    tags: [
      { name: 'Action', value: 'Balance' },
      { name: 'Recipient', value: address }
    ],
    data: "1234",
  });
  if (balanceResult.Error) {
    throw new Error(`Error with AO: ${reply.Error}`)
  }
  const reply = balanceResult.Messages[0];
  if (reply === undefined) {
    throw new Error(`No reply from AO`)
  }
  const balanceData = reply.Data;
  if (balanceData === undefined) {
    throw new Error(`No balance in reply from AO`)
  }
  const balanceArmstrong = BigInt(balanceData);
  const balance = bigintDivide(balanceArmstrong, ARMSTRONG_MULTIPLIER, 5);
  
  return balance;
}
