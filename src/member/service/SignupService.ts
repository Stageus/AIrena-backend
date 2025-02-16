import ErrorRegistry from '#error/ErrorRegistry'
import EmailSender from '#util/email/mailSender/index'
import RandomNicknameGenerator from '#util/nickname/nicknameGenerator/index'
import Token from '#util/token/index'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import SendVerifyEmailRequest from '../entity/dao/frontend/request/SendVerifyEmailRequest.js'
import SignupRequest from '../entity/dao/frontend/request/SignupRequest.js'
import SignupVerifyRequest from '../entity/dao/frontend/request/SignupVerifyRequest.js'
import SignupResponse from '../entity/dao/frontend/response/SignupResponse.js'
import MemberSignupRepository from '../repository/MemberSignupRepository.js'
import RedisEmailSignupRepository from '../repository/RedisEmailSignupRepository.js'

const signupRedirectUrl = `${process.env.FRONTEND_SERVER_URL}/redirect/signup`

export default class SignupService {
  /** 인증 이메일 전송 서비스 로직 */
  static async emailSend(signupRequest: SignupRequest) {
    const { id, password, passwordCheck, email } = signupRequest
    if (password != passwordCheck) {
      throw ErrorRegistry.PASSWORD_NOT_EQUAL
    }
    await MemberSignupRepository.checkIdAndEmailDuplicate(id, email)
    await RedisEmailSignupRepository.insertMemberDataAtRedis(
      id,
      password,
      email,
    )
    const token = Token.generateToken(id, email)
    EmailSender.sendSignupVerifyEmail(email, token)
    return new SignupResponse(token)
  }

  /** 회원가입 인증 서비스 로직 */
  static async verifySignup(
    signupVerifyRequest: SignupVerifyRequest,
    res: Response,
  ) {
    const getToken = signupVerifyRequest.token // 쿼리에 포함된 토큰
    if (!process.env.JWT_SIGNATURE_KEY)
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    const data: any = jwt.verify(getToken, process.env.JWT_SIGNATURE_KEY)
    const nickname = await RandomNicknameGenerator.generateNickname() // 랜덤 생성기 자리
    const checkRedis =
      await RedisEmailSignupRepository.checkVerifyEmailDataFromRedis()
    if (!checkRedis) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const memberHashData: any =
      await RedisEmailSignupRepository.getHashDataFromRedis(data.email)
    await MemberSignupRepository.insertNormalMemberData(
      memberHashData.id,
      memberHashData.password,
      data.email,
      nickname,
    )
    const token = Token.generateToken(memberHashData.id, data.email)
    Token.generateCookie('signupToken', token, res)
    return signupRedirectUrl
  }
  /** 회원가입 인증 이메일 재전송 서비스 로직 */
  static async sendVerifyEmail(sendVerifyEmailRequest: SendVerifyEmailRequest) {
    const { id, email } = sendVerifyEmailRequest
    await RedisEmailSignupRepository.increaseVerifyEmailDataFromRedis(email)
    const token = Token.generateVerifyToken(id, email)
    EmailSender.sendSignupVerifyEmail(email, token)
  }
}
