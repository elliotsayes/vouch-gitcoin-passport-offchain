import Query from '@irys/query'

const voucherAddress = process.env.VOUCHER_ADDRESS

export async function isVouched({ address }) {
  const query = new Query()
  const results = await query
    .search("arweave:transactions")
    .from([voucherAddress])
    .tags([
      { name: 'Data-Protocol', values: 'Vouch-For' },
      { name: 'Vouch-For', values: [address] },
      { name: 'Method', values: ['AO-Balance'] },
    ])
  if (results.length > 0) {
    return { ok: true }
  } else {
    return { ok: false }
  }

}