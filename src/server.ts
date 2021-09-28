import dotenv from 'dotenv'
import express from 'express'
import { handleErrors } from './middlewares/handleErrors'
import 'express-async-errors'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env',
})

import { router as authRouter } from './routes/authRoute'
import { router as usersRouter } from './routes/usersRoute'

const app = express()
app.use(express.json())

// routes
app.use('/v1', authRouter)
app.use('/v1', usersRouter)

// catch errors
app.use(handleErrors)

// run server
app.listen(3000, () => {
  console.log('Server is running')
})
