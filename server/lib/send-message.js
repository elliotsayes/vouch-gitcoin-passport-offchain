import { createDataItemSigner, message, result } from '@permaweb/aoconnect'
import fs from 'fs'

const key = JSON.parse(fs.readFileSync(process.env.WALLET, 'utf-8'))

function formatValue(value) {
  return `${value.toFixed(2)}-USD`
}

export async function sendMessage({ address, transaction, value }) {
  console.log('SEND TO AOS: ')
  const processId = process.env.VOUCH_DAO_PROCESS_ID || 'L1CWfW_LAWA7UY_zf9CFwbnt3wLuVMEueylFi_1YACo'
  const tags = [
    { name: 'Data-Protocol', value: 'Vouch' },
    { name: 'Vouch-For', value: address },
    { name: 'Method', value: 'Gitcoin-Passport' },
    { name: 'Confidence-Value', value: formatValue(value) },
  ];
  console.log("tags: ", tags)
  const messageId = await message({
    process: processId,
    tags,
    signer: createDataItemSigner(key)
  })
  const res = await result({
    process: processId,
    message: messageId
  })
  console.log('messageId', messageId)
  if (res.Error) {
    throw new Error(`Error with Vouch DAO: ${res.Error}`)
  }
  return { address, transaction, value }
}
