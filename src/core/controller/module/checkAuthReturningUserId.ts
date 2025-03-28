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
      throw ErrorRegistry.LOGIN_REQUIRED
    }
    if (!process.env.JWT_SIGNATURE_KEY) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const data: any = jwt.verify(token, process.env.JWT_SIGNATURE_KEY)
    if (!data.idx) {
      throw ErrorRegistry.LOGIN_REQUIRED
    }
    return data.idx
  } else if (auth === 'admin') {
    const token = req.cookies.loginToken
    if (!token) {
      throw ErrorRegistry.LOGIN_REQUIRED
    }
    if (!process.env.JWT_SIGNATURE_KEY) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const data: any = jwt.verify(token, process.env.JWT_SIGNATURE_KEY)
    if (!data.idx) {
      throw ErrorRegistry.LOGIN_REQUIRED
    }
    if (data.role !== 'ADMIN') {
      throw ErrorRegistry.ACCESS_DENIED
    }
    return data.idx
  }
}

export default checkAuthReturningUserId
