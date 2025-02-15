import ErrorRegistry from '#error/ErrorRegistry'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default class Token {
  static getTokenFromCookie(req: Request) {
    const token = req.cookies.token
    if (!token) {
      throw ErrorRegistry.TOKEN_REQUIRED
    }
    return token
  }

  static getDataFromToken(req: Request) {
    const token = req.cookies.token
    if (!token) {
      throw ErrorRegistry.TOKEN_REQUIRED
    }
    if (!process.env.JWT_SIGNATURE_KEY) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const secretKey: string = process.env.JWT_SIGNATURE_KEY
    const data: any = jwt.verify(token, secretKey)
    return data
  }

  static generateToken(id: string, email: string) {
    if (!process.env.JWT_SIGNATURE_KEY) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const secretKey: string = process.env.JWT_SIGNATURE_KEY
    const token = jwt.sign(
      {
        userId: id,
        email: email,
      },
      secretKey,
      {
        issuer: 'ai-rena',
        expiresIn: '60m',
      },
    )
    return token
  }

  static generateLoginToken(id: string, email: string, role: string) {
    if (!process.env.JWT_SIGNATURE_KEY) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const secretKey: string = process.env.JWT_SIGNATURE_KEY
    const token = jwt.sign(
      {
        userId: id,
        email: email,
        role: role,
      },
      secretKey,
      {
        issuer: 'ai-rena',
        expiresIn: '60m',
      },
    )
    return token
  }
  static generateVerifyToken() {}

  static generateCookie(name: string, token: string, res: Response) {
    res.cookie(name, token, {
      path: '/',
      domain: process.env.DEV_COOKIE_DOMAIN,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
    })
  }
}
