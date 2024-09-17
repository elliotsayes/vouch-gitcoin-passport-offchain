import express from 'express'
import session from 'express-session'
import cors from 'cors'

import { status } from './routes/status.js'
// import { vouch } from './routes/vouch.js'
import { signingMessage } from './routes/signingMessage.js'

const app = express()

app.use(cors())
app.set('trust proxy', 1)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

/** Routes */
app.get('/', status)
// app.get('/vouch', vouch)
app.get('/signing-message', signingMessage)

const port = process.env.PORT || 4000;

app.listen(port).on('listening', () => {
  console.log(`Server is listening on port ${port}`);
})