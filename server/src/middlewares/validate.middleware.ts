import { Request, Response, NextFunction } from 'express'
import { UserToken } from '../types/types'

interface RequestWithUserData extends Request {
  userData?: UserToken
}

export const validateSchema =
  (schema: any) =>
  (req: RequestWithUserData, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
      return
    } catch (error: any) {
      return res.status(400).json({
        error: error.errors.map((error: any) => error.message)
      })
    }
  }
