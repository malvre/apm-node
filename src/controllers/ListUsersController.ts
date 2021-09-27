import { Request, Response } from 'express'
import ListUsersUseCase from '../service/ListUsersUseCase'

class ListUsersController {
  static async handle(req: Request, res: Response) {
    const listUsersUseCase = new ListUsersUseCase()
    const users = await listUsersUseCase.execute()
    return res.json(users)
  }
}

export { ListUsersController }
