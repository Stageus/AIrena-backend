import LoginAdapter from '#adapter/OAuthAdapter'
import ErrorRegistry from '#error/ErrorRegistry'
import Token from '#util/Token'
import dotenv from 'dotenv'
import { Response } from 'express'
import NormalLoginRequest from '../entity/dao/frontend/request/NormalLoginRequest.js'
import MemberLoginRepository from '../repository/MemberLoginRepository.js'
dotenv.config()

const kakaoOauthUserInfoUrl = process.env.KAKAO_OAUTH_USER_INFO_URL || ''
const googleOauthUserInfoUrl = process.env.GOOGLE_OAUTH_USER_INFO_URL || ''
const signupRedirectUrl = `${process.env.FRONTEND_SERVER_URL}/redirect/signup`
const loginRedirectUrl = `${process.env.FRONTEND_SERVER_URL}/redirect/login`

export default class LoginService {
  /** 일반 로그인 서비스 로직*/
  static async attemptNormalLogin(
    normalLoginRequest: NormalLoginRequest,
    res: Response,
  ) {
    const { id, password } = normalLoginRequest
    const memberData: any = await MemberLoginRepository.getNormalLoginData(
      id,
      password,
    )
    if (!memberData) {
      throw ErrorRegistry.CAN_NOT_FIND_USER
    }
    const token: string = Token.generateLoginToken(
      memberData.id,
      memberData.email,
      memberData.role,
    )
    Token.generateCookie('loginToken', token, res)
  }
  /** 카카오 로그인 시도 , 정보 없으면 회원가입 진행 */
  static async checkKakaoUserDataAndSignin(
    code: string,
    res: Response,
  ): Promise<string> {
    const kakaoToken = await LoginAdapter.getKakaoToken(code)
    const userData = await LoginAdapter.getUserDataByToken(
      kakaoToken,
      kakaoOauthUserInfoUrl,
    )
    const checkResult: any = await MemberLoginRepository.checkMemberDataFromDb(
      userData.id,
    )

    if (!checkResult) {
      await MemberLoginRepository.insertKakaoLoginMemberData(
        userData.id as string,
        userData.properties.nickname,
      )
      const checkResult: any =
        await MemberLoginRepository.checkMemberDataFromDb(userData.id)
      const token = Token.generateLoginToken(
        checkResult.idx,
        checkResult.email,
        checkResult.role,
      )
      Token.generateCookie('loginToken', token, res)
      return signupRedirectUrl
    }

    const token = Token.generateLoginToken(
      checkResult.idx,
      checkResult.email,
      checkResult.role,
    )
    Token.generateCookie('loginToken', token, res)

    return loginRedirectUrl
  }
  /** 구글 로그인 시도 , 정보 없으면 회원가입 진행 */
  static async checkGoogleUserDataAndSignin(
    code: string,
    res: Response,
  ): Promise<string> {
    const googleLoginToken = await LoginAdapter.getGoogleToken(code)
    const userData = await LoginAdapter.getUserDataByToken(
      googleLoginToken,
      googleOauthUserInfoUrl,
    )
    const checkResult: any = await MemberLoginRepository.checkMemberDataFromDb(
      userData.id,
    )

    if (!checkResult) {
      await MemberLoginRepository.insertGoogleLoginMemberData(
        userData.id as string,
        userData.name,
        userData.email,
      )
      const checkResult: any =
        await MemberLoginRepository.checkMemberDataFromDb(userData.id)
      const token = Token.generateLoginToken(
        checkResult.idx,
        checkResult.email,
        checkResult.role,
      )
      Token.generateCookie('loginToken', token, res)
      return signupRedirectUrl
    }

    const token = Token.generateLoginToken(
      checkResult.idx,
      checkResult.email,
      checkResult.role,
    )
    Token.generateCookie('loginToken', token, res)

    return signupRedirectUrl
  }
}
