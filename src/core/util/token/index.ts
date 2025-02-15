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
  /** 로그인 토큰을 생성합니다.
   *  @id string
   *  @email string
   *  @role string
   */
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

  /** 쿠키를 생성합니다.
   *  @params {string} name
   *  - 생성할 쿠키의 이름입니다.
   *  @params {string} token
   *  - 쿠키에 포함할 token 입니다.
   *  @params {string} response
   *  - response로 전달하기 위한 객체입니다. 기본값으로 res를 사용합니다.
   */
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
