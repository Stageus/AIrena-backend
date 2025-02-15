import LoginAdapter from '#adapter/OAuthAdapter'
import MemberRepository from '#repository/MemberRepository'
import Token from '#util/token/index'
import dotenv from 'dotenv'
import { Response } from 'express'
dotenv.config()

const kakaoOauthUserInfoUrl = process.env.KAKAO_OAUTH_USER_INFO_URL || ''
const googleOauthUserInfoUrl = process.env.GOOGLE_OAUTH_USER_INFO_URL || ''
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
    const checkResult: any = await MemberRepository.checkMemberDataFromDb(
      userData.id,
    )
    const loginToken = Token.generateLoginToken(
      userData.id,
      userData.email,
      userData.role,
    )
    Token.generateCookie('loginToken', loginToken, res)

    if (!checkResult.rows[0] || checkResult.rows[0] == undefined) {
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
    const checkResult: any = await MemberRepository.checkMemberDataFromDb(
      userData.id,
    )
    const loginToken = Token.generateLoginToken(
      userData.id,
      userData.email,
      userData.role,
    )
    Token.generateCookie('loginToken', loginToken, res)

    if (!checkResult.rows[0] || checkResult.rows[0] == undefined) {
      await MemberRepository.insertGoogleLoginMember(
        userData.id as string,
        userData.name,
        userData.email,
      )
      return signupRedirectUrl
    }
    return signupRedirectUrl
  }
}
