import { Request, Response } from 'express'
import { UpdateUserUseCase } from '../service/UpdateUserUseCase'

class UpdateUserController {
  static async handle(req: Request, res: Response) {
    const { id } = req.params
    const { name, password } = req.body

    const updateUserUseCase = new UpdateUserUseCase()
    const updatedUser = await updateUserUseCase.execute({ id, name, password })
    return res.json(updatedUser)
  }
}

export { UpdateUserController }
