import dayjs from 'dayjs'
import { client } from '../prisma/client'

/***
 * Cria um registro de refresh token para um usuário específico
 */
class GenerateRefreshTokenProvider {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, 'second').unix()
    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    })

    return generateRefreshToken
  }
}

export { GenerateRefreshTokenProvider }
