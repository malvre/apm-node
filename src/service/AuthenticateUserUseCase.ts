import { client } from '../prisma/client'
import { compare } from 'bcryptjs'
import { GenerateRefreshTokenProvider } from '../providers/GenerateRefreshTokenProvider'
import { GenerateTokenProvider } from '../providers/GenerateTokenProvider'

interface IRequest {
  email: string
  password: string
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    // verifica se usuário existe
    const userExists = await client.user.findFirst({
      where: {
        email,
      },
    })

    if (!userExists) {
      throw new Error('User or password incorrect')
    }

    // verifica se a senha está correta
    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) {
      throw new Error('User or password incorrect')
    }

    // gera token do usuário
    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(userExists.id)

    // apaga refresh token existente
    await client.refreshToken.deleteMany({
      where: {
        userId: userExists.id,
      },
    })

    // gera refresh token
    const generateRefreshToken = new GenerateRefreshTokenProvider()
    const refreshToken = await generateRefreshToken.execute(userExists.id)

    return { token, refreshToken }
  }
}

export { AuthenticateUserUseCase }
