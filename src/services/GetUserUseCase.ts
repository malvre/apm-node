import { client } from '../prisma/client'

class GetUserUseCase {
  async execute(id: string) {
    const user = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        isAdmin: true,
      },
    })

    return user
  }
}

export { GetUserUseCase }
