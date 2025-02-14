import LoginAdapter from '#adapter/OAuthAdapter'
import LoginUserDataResponse from '#dto/frontend/response/loginUserDataResponse'
import MemberRepository from '#repository/MemberRepository'
import { Response } from 'express'
import jwt from 'jsonwebtoken'

const kakaoOauthUserInfoUrl = process.env.KAKAO_OAUTH_USER_INFO_URL || ''
const googleOauthUserInfoUrl = process.env.GOOGLE_OAUTH_USER_INFO_URL || ''

export default class LoginService {
  static async checkKakaoUserDataAndSignin(code: string) {
    const loginToken = await LoginAdapter.getKakaoToken(code)
    const userData = await LoginAdapter.getUserDataByToken(
      loginToken,
      kakaoOauthUserInfoUrl,
    )
    console.log(userData.id as string, '받아온 소셜 로그인 아이디')
    const checkResult: any = await MemberRepository.checkMemberDataFromDb(
      userData.id,
    )
    console.log(checkResult.rows[0], ' 결과 검색')
    if (!checkResult.rows[0] || checkResult.rows[0] == undefined) {
      console.log(userData.id as string, '소셜 아이디')
      console.log(userData.properties.nickname, '소셜 닉네임')
      await MemberRepository.insertKakaoLoginMember(
        userData.id as string,
        userData.properties.nickname,
      )
      console.log('회원가입함')
    }
    console.log('로그인 됨')
    return new LoginUserDataResponse(userData)
  }

  static async checkGoogleUserDataAndSignin(code: string, res: Response) {
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
      console.log('회원가입함')
    }
    const secretKey: string = process.env.JWT_SIGNATURE_KEY || 'jwt-secret-key'
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

    return new LoginUserDataResponse(userData)
  }
}
