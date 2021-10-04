import express, { Request, Response } from 'express'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateUserUseCase } from '../services/CreateUserUseCase'
import { DeleteUserUseCase } from '../services/DeleteUserUseCase'
import { GetUserUseCase } from '../services/GetUserUseCase'
import { ListUsersUseCase } from '../services/ListUsersUseCase'
import { UpdateUserUseCase } from '../services/UpdateUserUseCase'

const userController = express.Router()

// POST /users
userController.post(
  '/users',
  ensureAuthenticated,
  ensureAdmin,
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const createUserUseCase = new CreateUserUseCase()
    const user = await createUserUseCase.execute({
      name,
      email,
      password,
    })
    res.json(user)
  }
)

// GET /users
userController.get('/users', ensureAuthenticated, async (req: Request, res: Response) => {
  const listUsersUseCase = new ListUsersUseCase()
  const users = await listUsersUseCase.execute()
  return res.json(users)
})

// GET /users/:id
userController.get('/users', ensureAuthenticated, async (req: Request, res: Response) => {
  const id = req.params.id
  const getUserUseCase = new GetUserUseCase()
  const user = await getUserUseCase.execute(id)
  res.json(user)
})

// PUT /users/:id
userController.put(
  '/users/:id',
  ensureAuthenticated,
  ensureAdmin,
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, password } = req.body
    const updateUserUseCase = new UpdateUserUseCase()
    const updatedUser = await updateUserUseCase.execute({ id, name, password })
    return res.json(updatedUser)
  }
)

// DELETE /users/:id
userController.delete(
  '/users/:id',
  ensureAuthenticated,
  ensureAdmin,
  async (req: Request, res: Response) => {
    const id = req.params.id
    const deleteUserUseCase = new DeleteUserUseCase()
    const user = await deleteUserUseCase.execute(id)
    res.json(user)
  }
)

export { userController }
