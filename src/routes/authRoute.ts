import express from 'express'
const router = express.Router()

import { AuthenticateUserController } from '../controllers/AuthenticateUserController'
import { RefreshTokenController } from '../controllers/RefreshTokenController'

router.post('/login', AuthenticateUserController.handle)
router.post('/refresh-token', RefreshTokenController.handle)

export { router }
