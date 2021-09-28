import { client } from '../prisma/client'
import { hash } from 'bcryptjs'

interface IRequest {
  name: string
  email: string
  password: string
}

class CreateUserUseCase {
  async execute({ name, email, password }: IRequest) {
    // verifica se usuário já existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        email,
      },
    })
    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    // outras validações
    if (!name) {
      throw new Error('Name is empty')
    }

    if (!email) {
      throw new Error('E-mail is empty')
    }

    if (!password) {
      throw new Error('Password is empty')
    }

    // cadastra o usuário
    const passwordHash = await hash(password, 8)
    const user = await client.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        isAdmin: false,
      },
    })
    return user
  }
}

export { CreateUserUseCase }
