import ErrorRegistry from '#error/ErrorRegistry'
import { Request } from 'express'
import jwt from 'jsonwebtoken'

export default class Token {
  static getToken(req: Request) {
    const token = req.cookies.loginToken
    console.log(token)
    if (!token) {
      throw ErrorRegistry.TOKEN_REQUIRED
    }
    console.log(token)
    const secretKey = process.env.JWT_SIGNATURE_KEY || 'jwt-secret-key'
    try {
      return jwt.verify(token, secretKey)
    } catch (error) {
      console.log(error)
      throw ErrorRegistry.TEST_ERROR
    }
  }

  static returnToken(req: Request) {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ErrorRegistry.TOKEN_REQUIRED
    }
    const token = authHeader.slice(7)
    return token
  }
}
