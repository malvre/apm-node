import { client } from '../prisma/client'

class ListUsersUseCase {
  async execute() {
    const users = await client.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    return users
  }
}

export default ListUsersUseCase
