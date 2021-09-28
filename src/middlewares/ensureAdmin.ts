import { NextFunction, Request, Response } from 'express'
import { client } from '../prisma/client'
import { DecodeTokenProvider } from '../providers/DecodeTokenProvider'

/***
 * Middleware para verificar se o usuário é administrador
 */
export const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization

  // se token não foi recebido...
  if (!authToken) {
    return res.status(401).json({
      message: 'Token is missing',
    })
  }

  // decodifica token
  const [, token] = authToken.split(' ')
  const decodeTokenProvider = new DecodeTokenProvider()
  const userId = await decodeTokenProvider.execute(token)

  // localiza usuário
  const user = await client.user.findFirst({
    where: {
      id: `${userId}`,
    },
  })

  // se usuário não for admin...
  if (!user?.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  return next()
}
