import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

/***
 * Middleware para verificar se o usuário está autenticado
 */
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization

  // se token não foi recebido...
  if (!authToken) {
    return res.status(401).json({
      message: 'Token is missing',
    })
  }

  // obtém string do token
  const [, token] = authToken.split(' ')

  // verifica se token é válido
  try {
    verify(token, process.env.SECRET_KEY as string)
    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid' })
  }
}
