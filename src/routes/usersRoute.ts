import express from 'express'
const router = express.Router()

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

import { ListUsersController } from '../controllers/ListUsersController'
import { CreateUserController } from '../controllers/CreateUserController'
import { GetUserController } from '../controllers/GetUserController'
import { UpdateUserController } from '../controllers/UpdateUserController'
import { DeleteUserController } from '../controllers/DeleteUserController'

router.get('/users', ensureAuthenticated, ListUsersController.handle)
router.get('/users/:id', ensureAuthenticated, GetUserController.handle)
router.post('/users', ensureAuthenticated, ensureAdmin, CreateUserController.handle)
router.put('/users/:id', ensureAuthenticated, ensureAdmin, UpdateUserController.handle)
router.delete('/users/:id', ensureAuthenticated, ensureAdmin, DeleteUserController.handle)

export { router }
