import { Request, Response } from 'express'
import { DeleteUserUseCase } from '../services/DeleteUserUseCase'

class DeleteUserController {
  static async handle(req: Request, res: Response) {
    const id = req.params.id

    const deleteUserUseCase = new DeleteUserUseCase()
    const user = await deleteUserUseCase.execute(id)
    res.json(user)
  }
}

export { DeleteUserController }
