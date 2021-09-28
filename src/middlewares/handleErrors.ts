import { NextFunction, Request, Response } from 'express'

/***
 * Middleware para capturar erros e transportar para a camada HTTP do express
 */
export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}
