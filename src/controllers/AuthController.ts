import express, { Request, Response } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { AuthenticateUserUseCase } from '../services/AuthenticateUserUseCase'
import { RefreshTokenUseCase } from '../services/RefreshTokenUseCase'
const authController = express.Router()

authController.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  const authenticateUserUseCase = new AuthenticateUserUseCase()
  const data = await authenticateUserUseCase.execute({ email, password })

  return res.json(data)
})

authController.post('/refresh-token', ensureAuthenticated, async (req: Request, res: Response) => {
  const { refresh_token } = req.body
  const refreshTokenUseCase = new RefreshTokenUseCase()
  const token = await refreshTokenUseCase.execute(refresh_token)
  return res.json(token)
})

export { authController }
