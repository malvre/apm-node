import dayjs from 'dayjs'
import { client } from '../prisma/client'
import { GenerateRefreshTokenProvider } from '../providers/GenerateRefreshTokenProvider'
import { GenerateTokenProvider } from '../providers/GenerateTokenProvider'

class RefreshTokenUseCase {
  async execute(refresh_token: string) {
    // localiza refresh token
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    })

    if (!refreshToken) {
      throw new Error('Refresh token invalid')
    }

    // gera novo token
    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(refreshToken.userId)

    // verifica se token está expirado e cria novo token
    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    if (refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      })
      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
      const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId)

      return { token, refreshToken: newRefreshToken }
    }

    return { token }
  }
}

export { RefreshTokenUseCase }
