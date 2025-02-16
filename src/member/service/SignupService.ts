import ErrorRegistry from '#error/ErrorRegistry'
import EmailSender from '#util/email/mailSender/index'
import RandomNicknameGenerator from '#util/nickname/nicknameGenerator/index'
import Token from '#util/token/index'
import { response } from 'express'
import jwt from 'jsonwebtoken'
import SendVerifyEmailRequest from '../dao/frontend/request/SendVerifyEmailRequest.js'
import SignupRequest from '../dao/frontend/request/SignupRequest.js'
import SignupVerifyRequest from '../dao/frontend/request/SignupVerifyRequest.js'
import SignupResponse from '../dao/frontend/response/SignupResponse.js'
import MemberSignupRepository from '../repository/MemberSignupRepository.js'
import RedisEmailRepository from '../repository/RedisEmailSignupRepository.js'

const signupRedirectUrl = `${process.env.FRONTEND_SERVER_URL}/redirect/signup`

export default class SignupService {
  /** 인증 이메일 전송 서비스 로직 */
  static async emailSend(signupRequest: SignupRequest) {
    const { id, password, passwordCheck, email } = signupRequest
    if (password != passwordCheck) {
      throw ErrorRegistry.PASSWORD_NOT_EQUAL
    }
    await MemberSignupRepository.checkIdAndEmailDuplicate(id, email)
    await RedisEmailRepository.insertMemberDataAtRedis(id, password, email)
    const token = Token.generateToken(id, email)
    EmailSender.sendSignupVerifyEmail(email, token)
    return new SignupResponse(token)
  }

  /** 회원가입 인증 서비스 로직 */
  static async verifySignup(signupVerifyRequest: SignupVerifyRequest) {
    const { token } = signupVerifyRequest // 쿼리에 포함된 토큰
    if (!process.env.JWT_SIGNATURE_KEY)
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    const data: any = jwt.verify(token, process.env.JWT_SIGNATURE_KEY)
    const nickname = await RandomNicknameGenerator.generateNickname() // 랜덤 생성기 자리
    await RedisEmailRepository.checkVerifyEmailDataFromRedis(data.email)
    const memberHashData: any = await RedisEmailRepository.getHashDataFromRedis(
      data.email,
    )
    await RedisEmailRepository.insertNormalMemberData(
      //수정 필요
      memberHashData.id,
      memberHashData.password,
      data.email,
      nickname,
    )
    const signupToken = Token.generateToken(memberHashData.id, data.email)
    Token.generateCookie('signup', signupToken, response)
    return signupRedirectUrl
  }
  /** 회원가입 인증 이메일 재전송 서비스 로직 */
  static async sendVerifyEmail(sendVerifyEmailRequest: SendVerifyEmailRequest) {
    const { id, email } = sendVerifyEmailRequest
    await RedisEmailRepository.increaseVerifyEmailDataFromRedis(email)
    const token = Token.generateVerifyToken(id, email)
    EmailSender.sendSignupVerifyEmail(email, token)
  }
}
