import ErrorRegistry from '#error/ErrorRegistry'
import { Request } from 'express'
import jwt from 'jsonwebtoken'

const checkAuthReturningUserId = (
  auth: string,
  req: Request<any, any, any, any>,
) => {
  if (auth === 'login') {
    const token = req.cookies.loginToken
    if (!token) {
      throw ErrorRegistry.TOKEN_REQUIRED
    }
    if (!process.env.JWT_SIGNATURE_KEY) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const data: any = jwt.verify(token, process.env.JWT_SIGNATURE_KEY)
    if (!data.userId) {
      throw ErrorRegistry.TOKEN_REQUIRED
    }
    return data.userId
  } else if (auth === 'admin') {
    const token = req.cookies.loginToken
    if (!token) {
      throw ErrorRegistry.TOKEN_REQUIRED
    }
    if (!process.env.JWT_SIGNATURE_KEY) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const data: any = jwt.verify(token, process.env.JWT_SIGNATURE_KEY)
    if (!data.userId) {
      throw ErrorRegistry.TOKEN_REQUIRED
    }
    if (data.role !== 'admin') {
      throw ErrorRegistry.ACCESS_DENIED
    }
    return data.userId
  }
}

export default checkAuthReturningUserId
