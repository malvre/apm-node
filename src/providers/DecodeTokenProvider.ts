import { verify } from 'jsonwebtoken'

/***
 * Decodifica um token
 */
class DecodeTokenProvider {
  async execute(token: string) {
    const secretKey = process.env.SECRET_KEY as string
    const { sub } = verify(token, secretKey)
    return sub
  }
}

export { DecodeTokenProvider }
