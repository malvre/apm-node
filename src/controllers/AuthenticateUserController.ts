import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from '../services/AuthenticateUserUseCase'

class AuthenticateUserController {
  static async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const authenticateUserUseCase = new AuthenticateUserUseCase()
    const data = await authenticateUserUseCase.execute({ email, password })

    return res.json(data)
  }
}

export { AuthenticateUserController }
