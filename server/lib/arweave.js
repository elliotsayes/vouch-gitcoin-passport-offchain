import Arweave from 'arweave'
import fs from 'node:fs'

export const defaultArweave = Arweave.init({})
export const voucherWallet = JSON.parse(fs.readFileSync(process.env.WALLET, 'utf-8'))
export let voucherAddress = ''

export async function setup() {
  voucherAddress = await defaultArweave.wallets.jwkToAddress(voucherWallet)
}
