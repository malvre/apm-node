import { sign } from 'jsonwebtoken'

/***
 * Gera um token
 */
class GenerateTokenProvider {
  async execute(userId: string) {
    const secretKey = process.env.SECRET_KEY as string
    const token = sign({}, secretKey, {
      subject: userId,
      expiresIn: '120s',
    })

    return token
  }
}

export { GenerateTokenProvider }
