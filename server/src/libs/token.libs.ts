import jwt from 'jsonwebtoken'
import { UserToken } from '../types/types'

export const generateToken = async (userSave: UserToken): Promise<string> => {
  try {
    const tokenExpiration = '1d'
    const tokenPayload: UserToken = {
      ...userSave
    }

    const token = await jwt.sign(tokenPayload, `${process.env.SECRETKEY}`, {
      expiresIn: tokenExpiration
    })

    return token
  } catch (error: any) {
    throw new Error(`Error al generar el token: ${error.message}`)
  }
}

export const validateToken = async (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRETKEY || '', (err, user) => {
      if (err) {
        reject(new Error('Invalid token'))
      } else {
        resolve(user)
      }
    })
  })
}
