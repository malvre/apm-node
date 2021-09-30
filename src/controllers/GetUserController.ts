import { Request, Response } from 'express'
import { GetUserUseCase } from '../services/GetUserUseCase'

class GetUserController {
  static async handle(req: Request, res: Response) {
    const id = req.params.id
    const getUserUseCase = new GetUserUseCase()
    const user = await getUserUseCase.execute(id)
    res.json(user)
  }
}

export { GetUserController }
