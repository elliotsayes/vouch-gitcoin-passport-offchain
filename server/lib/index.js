import { sub, isBefore, parseISO } from 'date-fns'
//import isBefore from 'date-fns/isBefore'
import { of, fromPromise, Rejected, Resolved } from 'hyper-async'
import { dispatch } from '../lib/dispatch.js'
import { writeInteraction } from '../lib/write-interaction.js'
import { isVouched } from '../lib/is-vouched.js'
import { sendMessage } from './send-message.js'

export function doVouch(address, ethAddress, value) {
  return of({ address, ethAddress, value })
    // .chain(ctx => fromPromise(isVouched)(ctx)
    //   .chain(r => r.ok ? Rejected({ message: 'Already vouched!' }) : Resolved(ctx))
    // )
    .chain(fromPromise(sendMessage))
    // .chain(fromPromise(dispatch))
    // .chain(fromPromise(writeInteraction))
    .toPromise()
}