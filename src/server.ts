import dotenv from 'dotenv'
import express from 'express'
import { handleErrors } from './middlewares/handleErrors'
import 'express-async-errors'

dotenv.config()

import { router as usersRouter } from './routes/usersRoute'
import { router as authRouter } from './routes/authRoute'

const app = express()
app.use(express.json())

app.use(usersRouter)
app.use(authRouter)

// catch errors ////////////////////////////////////////////////////////////////////
app.use(handleErrors)

app.listen(3000, () => {
  console.log('Server is running')
})
