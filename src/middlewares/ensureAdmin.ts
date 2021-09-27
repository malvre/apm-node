import { NextFunction, Request, Response } from 'express'
import { client } from '../prisma/client'
import { DecodeTokenProvider } from '../providers/DecodeTokenProvider'

export const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({
      message: 'Token is missing',
    })
  }

  const [, token] = authToken.split(' ')
  const decodeTokenProvider = new DecodeTokenProvider()
  const userId = await decodeTokenProvider.execute(token)

  const user = await client.user.findFirst({
    where: {
      id: `${userId}`,
    },
  })

  if (!user?.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  return next()
}
