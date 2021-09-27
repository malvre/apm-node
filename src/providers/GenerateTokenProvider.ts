import { sign } from 'jsonwebtoken'

class GenerateTokenProvider {
  async execute(userId: string) {
    const secretKey = process.env.SECRET_KEY as string
    const token = sign({}, secretKey, {
      subject: userId,
      expiresIn: '20s',
    })

    return token
  }
}

export { GenerateTokenProvider }
