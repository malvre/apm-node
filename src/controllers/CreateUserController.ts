import { Request, Response } from 'express'
import { CreateUserUseCase } from '../service/CreateUserUseCase'

class CreateUserController {
  static async handle(req: Request, res: Response) {
    const { name, email, password } = req.body
    const createUserUseCase = new CreateUserUseCase()
    const user = await createUserUseCase.execute({
      name,
      email,
      password,
    })

    res.json(user)
  }
}

export { CreateUserController }
