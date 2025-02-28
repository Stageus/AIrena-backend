import ErrorRegistry from '#error/ErrorRegistry'
import EmailSender from '#util/EmailSender'
import RandomNicknameGenerator from '#util/RandomNicknameGenerator'
import Token from '#util/Token'
import CryptoJS from 'crypto-js'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import SendVerifyEmailRequest from '../entity/dao/frontend/request/SendVerifyEmailRequest.js'
import SignupRequest from '../entity/dao/frontend/request/SignupRequest.js'
import SignupVerifyRequest from '../entity/dao/frontend/request/SignupVerifyRequest.js'
import SignupResponse from '../entity/dao/frontend/response/SignupResponse.js'
import MemberSignupRepository from '../repository/MemberSignupRepository.js'
import RedisEmailSignupRepository from '../repository/RedisEmailSignupRepository.js'
export default class SignupService {
  /** 인증 이메일 전송 서비스 로직 */
  static async emailSend(signupRequest: SignupRequest) {
    const { id, password, passwordCheck, email } = signupRequest
    if (password != passwordCheck) {
      throw ErrorRegistry.PASSWORD_NOT_EQUAL
    }
    await MemberSignupRepository.checkIdAndEmailDuplicate(id, email)
    const token = Token.generateValidateToken(id, email)
    await RedisEmailSignupRepository.insertMemberDataAtRedis(
      id,
      password,
      email,
      token,
    )
    EmailSender.sendSignupVerifyEmail(email, token)
    return new SignupResponse(token)
  }

  /** 회원가입 인증 서비스 로직 */
  static async verifySignup(
    signupVerifyRequest: SignupVerifyRequest,
    res: Response,
  ) {
    const getToken = signupVerifyRequest.token
    if (!process.env.JWT_SIGNATURE_KEY)
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    const data: any = jwt.verify(getToken, process.env.JWT_SIGNATURE_KEY)

    if (!(await RedisEmailSignupRepository.checkVerifyEmailDataFromRedis())) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const memberHashData: any =
      await RedisEmailSignupRepository.getHashDataFromRedis(data.email)
    const salt = process.env.ENCRYPT_SALT_STRING
    const password = CryptoJS.SHA256(memberHashData.password + salt).toString()
    const result = await MemberSignupRepository.insertNormalMemberData(
      memberHashData.id,
      password,
      data.email,
      RandomNicknameGenerator.generateNickname(),
    )
    const token = Token.generateLoginToken(
      result.idx,
      result.email,
      result.role,
    )
    Token.generateCookie('loginToken', token, res)
  }
  /** 회원가입 인증 이메일 재전송 서비스 로직 */
  static async sendVerifyEmail(sendVerifyEmailRequest: SendVerifyEmailRequest) {
    const { email } = sendVerifyEmailRequest
    const checkRedis =
      await RedisEmailSignupRepository.checkVerifyEmailDataFromRedis()
    if (!checkRedis) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const hashData: any = RedisEmailSignupRepository.getHashDataFromRedis(email)
    await RedisEmailSignupRepository.increaseVerifyEmailDataFromRedis(email)
    const token = Token.generateVerifyToken(hashData.id, email)
    EmailSender.sendSignupVerifyEmail(email, token)
  }
}
