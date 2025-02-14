import LoginAdapter from '#adapter/OAuthAdapter'
import MemberRepository from '#repository/MemberRepository'
import dotenv from 'dotenv'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
dotenv.config()

const kakaoOauthUserInfoUrl = process.env.KAKAO_OAUTH_USER_INFO_URL || ''
const googleOauthUserInfoUrl = process.env.GOOGLE_OAUTH_USER_INFO_URL || ''
const secretKey: string = process.env.JWT_SIGNATURE_KEY || 'jwt-secret-key'

const signupRedirectUrl = `${process.env.FRONTEND_SERVER_URL}/signup/redirect`
const loginRedirectUrl = `${process.env.FRONTEND_SERVER_URL}/login/redirect`

export default class LoginService {
  static async checkKakaoUserDataAndSignin(
    code: string,
    res: Response,
  ): Promise<string> {
    const kakaoToken = await LoginAdapter.getKakaoToken(code)
    const userData = await LoginAdapter.getUserDataByToken(
      kakaoToken,
      kakaoOauthUserInfoUrl,
    )
    console.log(userData.id as string, '받아온 소셜 로그인 아이디')
    const checkResult: any = await MemberRepository.checkMemberDataFromDb(
      userData.id,
    )

    const loginToken = jwt.sign(
      {
        userId: userData.id,
        password: userData.password,
        email: userData.email,
        provider: userData.provider,
        role: userData.role,
      },
      secretKey,
      {
        issuer: 'ai-rena',
        expiresIn: '60m',
      },
    )

    res.cookie('loginToken', loginToken, {
      path: '/',
      domain: process.env.DEV_COOKIE_DOMAIN,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
    })

    console.log(checkResult.rows[0], ' 결과 검색')
    if (!checkResult.rows[0] || checkResult.rows[0] == undefined) {
      console.log(userData.id as string, '소셜 아이디')
      console.log(userData.properties.nickname, '소셜 닉네임')
      await MemberRepository.insertKakaoLoginMember(
        userData.id as string,
        userData.properties.nickname,
      )
      return signupRedirectUrl
    }
    return loginRedirectUrl
  }

  static async checkGoogleUserDataAndSignin(
    code: string,
    res: Response,
  ): Promise<string> {
    const googleLoginToken = await LoginAdapter.getGoogleToken(code)
    const userData = await LoginAdapter.getUserDataByToken(
      googleLoginToken,
      googleOauthUserInfoUrl,
    )
    console.log(userData.id as string, '받아온 소셜 로그인 아이디')
    const checkResult: any = await MemberRepository.checkMemberDataFromDb(
      userData.id,
    )
    console.log(checkResult.rows[0], ' 결과 검색')
    if (!checkResult.rows[0] || checkResult.rows[0] == undefined) {
      console.log(userData.id as string, '소셜 아이디')
      console.log(userData.name, '소셜 닉네임')
      await MemberRepository.insertGoogleLoginMember(
        userData.id as string,
        userData.name,
        userData.email,
      )
    }

    const loginToken = jwt.sign(
      {
        userId: userData.id,
        password: userData.password,
        email: userData.email,
        provider: userData.provider,
        role: userData.role,
      },
      secretKey,
      {
        issuer: 'ai-rena',
        expiresIn: '60m',
      },
    )

    res.cookie('loginToken', loginToken, {
      path: '/',
      domain: process.env.DEV_COOKIE_DOMAIN,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
    })

    console.log('로그인 됨')
    return signupRedirectUrl
  }
}
