import dotenv from 'dotenv'
import express from 'express'
import { handleErrors } from './middlewares/handleErrors'
import 'express-async-errors'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env',
})

import { userController } from './controllers/UserController'
import { authController } from './controllers/AuthController'

const app = express()
app.use(express.json())

// routes
app.use('/v1', authController)
app.use('/v1', userController)

// catch errors
app.use(handleErrors)

// run server
app.listen(3000, () => {
  console.log('Server is running')
})
