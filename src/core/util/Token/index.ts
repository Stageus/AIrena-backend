import ErrorRegistry from '#error/ErrorRegistry'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
export default class Token {
  /** 토큰에서 data를 추출합니다.
   *  기본적으로 object를 반환합니다.
   */
  static getDataFromLoginToken(req: Request) {
    const token = req.cookies.loginToken
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

  /**토큰을 생성합니다.
   *  @params {string} id
   *  - 사용자 아이디 입니다.
   *  @params {string} email
   *  - 사용자 이메일 주소입니다.
   */
  static generateValidateToken(id: string, email: string) {
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
        expiresIn: '30d',
      },
    )
    return token
  }
  /** 로그인 토큰을 생성합니다.
   *  @params {string} idx
   *  - 사용자 인덱스 입니다.
   *  @params {string} email
   *  - 사용자 이메일 주소입니다.
   *  @params {string} role
   *  - 사용자 권한입니다.
   */
  static generateLoginToken(idx: number, email: string, role: string) {
    if (!process.env.JWT_SIGNATURE_KEY) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const secretKey: string = process.env.JWT_SIGNATURE_KEY
    const token = jwt.sign(
      {
        idx: idx,
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
  /** 인증 토큰을 생성합니다.
   *  @params {string} id
   *  - 사용자 아이디 입니다.
   *  @params {string} email
   *  - 사용자 이메일 주소입니다.
   */
  static generateVerifyToken(id: string, email: string) {
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
        expiresIn: '1d',
      },
    )
    return token
  }

  /** 쿠키를 생성합니다.
   *  @params {string} name
   *  - 쿠키에 담길 key 입니다.
   *  @params {string} token
   *  - 쿠키에 담길 value 입니다.
   *  @params {string} response
   *  - response로 전달하기 위한 객체입니다. 기본값으로 res를 사용합니다.
   */
  static generateCookie(name: string, token: string, res: Response) {
    res.cookie(name, token, {
      path: '/',
      domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    })
  }

  static destroyCookie(name: string, res: Response) {
    res.clearCookie(name, {
      path: '/',
      domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      maxAge: 0,
    })
  }
}
