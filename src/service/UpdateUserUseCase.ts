import { client } from '../prisma/client'
import { hash } from 'bcryptjs'

interface IRequest {
  id: string
  name: string
  password: string
}

class UpdateUserUseCase {
  async execute({ id, name, password }: IRequest) {
    // validações
    if (!name) {
      throw new Error('Name is empty')
    }

    if (!password) {
      throw new Error('Password is empty')
    }

    // atualiza usuário
    const passwordHash = await hash(password, 8)
    const updatedUser = await client.user.update({
      where: {
        id,
      },
      data: {
        name,
        password: passwordHash,
      },
    })

    return updatedUser
  }
}

export { UpdateUserUseCase }
