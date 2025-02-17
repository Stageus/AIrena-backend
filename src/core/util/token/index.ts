import ErrorRegistry from '#error/ErrorRegistry'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
dotenv.config()
export default class Token {
  /** 쿠키로부터 토큰을 얻어옵니다.
   *  기본적으로 string 입니다.
   */
  static getTokenFromCookie(req: Request) {
    // const tokenKey = Object.keys(req.cookies).find((key) => /token/i.test(key))

    // if (!tokenKey || !req.cookies[tokenKey]) {
    //   throw ErrorRegistry.TOKEN_REQUIRED
    // }
    // return req.cookies[tokenKey] // 찾은 토큰 값을 반환
    const token = req.cookies.loginToken
    if (!token) {
      throw ErrorRegistry.TOKEN_REQUIRED
    }
    return token
  }
  /** 토큰에서 data를 추출합니다.
   *  기본적으로 object를 반환합니다.
   */
  static getDataFromToken(req: Request) {
    const tokenKey = Object.keys(req.cookies).find((key) => /token/i.test(key))

    if (!tokenKey || !req.cookies[tokenKey]) {
      throw ErrorRegistry.TOKEN_REQUIRED
    }
    if (!process.env.JWT_SIGNATURE_KEY) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const secretKey: string = process.env.JWT_SIGNATURE_KEY
    const data: any = jwt.verify(req.cookies[tokenKey], secretKey)
    return data
  }

  /**토큰을 생성합니다.
   *  @params {string} id
   *  - 사용자 아이디 입니다.
   *  @params {string} email
   *  - 사용자 이메일 주소입니다.
   */
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
   *  @params {string} id
   *  - 사용자 아이디 입니다.
   *  @params {string} email
   *  - 사용자 이메일 주소입니다.
   *  @params {string} role
   *  - 사용자 권한입니다.
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
        expiresIn: '60m',
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
      domain: process.env.DEV_COOKIE_DOMAIN,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
    })
  }
}
