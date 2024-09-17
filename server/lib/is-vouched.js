import Query from '@irys/query'
import { voucherAddress } from './arweave.js'

export async function isVouched({ address }) {
  const query = new Query()
  const results = await query
    .search("arweave:transactions")
    .from([voucherAddress])
    .tags([
      { name: 'Data-Protocol', values: 'Vouch' },
      { name: 'Vouch-For', values: address },
      { name: 'Method', values: 'Gitcoin-Passport' },
    ])
  if (results.length > 0) {
    return { ok: true }
  } else {
    return { ok: false }
  }

}