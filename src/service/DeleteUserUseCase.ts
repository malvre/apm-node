import { client } from '../prisma/client'

class DeleteUserUseCase {
  async execute(id: string) {
    const deletedUser = await client.user.delete({
      where: {
        id,
      },
    })
    return deletedUser
  }
}

export { DeleteUserUseCase }
