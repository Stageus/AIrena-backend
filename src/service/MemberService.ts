import FindPasswordRequest from '#dto/frontend/request/FindPasswordRequest'
import NicknameChangeRequest from '#dto/frontend/request/NicknameChangeRequest'

import NormalLoginRequest from '#dto/frontend/request/NormalLoginRequest'
import PasswordChangeRequest from '#dto/frontend/request/PasswordChangeRequest'
import SignupRequest from '#dto/frontend/request/SignupRequest'
import SignupVerifyRequest from '#dto/frontend/request/SignupVerifyRequest'
import ErrorRegistry from '#error/ErrorRegistry'
import MemberRepository from '#repository/MemberRepository'
import EmailSender from '#util/email/mailSender/index'
import Token from '#util/token/index'
import dotenv from 'dotenv'
import { Request, Response } from 'express'

import SendFindPasswordEmailRequest from '#dto/frontend/request/SendFindPasswordEmailRequest'
import SendVerifyEmailRequest from '#dto/frontend/request/SendVerifyEmailRequest'
import SignupResponse from '#dto/frontend/response/SignupResponse'
import jwt from 'jsonwebtoken'
import RandomNicknameGenerator from '../nickname/randomNicknameGenerator.js'
dotenv.config()

export default class MemberService {
  /** 인증 이메일 전송 서비스 로직 */
  static async emailSend(signupRequest: SignupRequest) {
    const { id, password, passwordCheck, email } = signupRequest
    if (password != passwordCheck) {
      throw ErrorRegistry.PASSWORD_NOT_EQUAL
    }
    /** 중복 처리 구간 */
    await MemberRepository.checkIdAndEmailDuplicate(id, email)
    /** redis에 이메일 정보를 저장합니다.*/
    console.log(id, password, email)
    await MemberRepository.insertMemberDataAtRedis(id, password, email)
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
    await MemberRepository.emailCheck(data.email)
    const memberHashData: any = await MemberRepository.getHashDataFromRedis(
      data.email,
    )
    await MemberRepository.insertNormalMember(
      memberHashData.id,
      memberHashData.password,
      data.email,
      nickname,
    )
  }
  /** 회원가입 인증 이메일 재전송 서비스 로직 */
  static async sendVerifyEmail(sendVerifyEmailRequest: SendVerifyEmailRequest) {
    const { id, email } = sendVerifyEmailRequest
    await MemberRepository.checkVerifyEmailDataFromRedis(email)
    const token = Token.generateToken(id, email)
    EmailSender.sendSignupVerifyEmail(email, token)
  }

  /** 닉네임 변경 서비스 로직 */
  static async nicknameChange(
    req: Request,
    nicknameChangeRequest: NicknameChangeRequest,
  ) {
    const data = Token.getDataFromToken(req)
    const { nickname } = nicknameChangeRequest
    await MemberRepository.changeNickname(nickname, data.userId)
  }

  /** 비밀번호 검색 서비스 로직 */
  static async findPassword(findPasswordRequest: FindPasswordRequest) {
    const { id, email } = findPasswordRequest
    const checkResult = await MemberRepository.checkMemberPassword(id, email)
    if (checkResult == 0) {
      throw ErrorRegistry.CAN_NOT_FIND_USER
    }
    const token = Token.generateToken(id, email)
    EmailSender.sendFindPasswordVerifyEmail(email, token)
  }

  /** 비밀번호 변경 서비스 로직 */
  static async changePassword(
    req: Request,
    passwordChangeRequest: PasswordChangeRequest,
  ) {
    const { password } = passwordChangeRequest
    try {
      const data = Token.getDataFromToken(req)
      await MemberRepository.updateMemberPassword(password, data.userId)
      return
    } catch (e) {
      throw ErrorRegistry.PASSWORD_CHANGE_FAILED
    }
  }

  /** 비밀번호 찾기 인증 이메일 재전송 서비스 로직 */
  static async sendPasswordFindEmail(
    sendFindPasswordEmailRequest: SendFindPasswordEmailRequest,
  ) {
    const { id, email } = sendFindPasswordEmailRequest
    await MemberRepository.checkFindPasswordEmailDataFromRedis(email)
    const token = Token.generateToken(id, email)
    EmailSender.sendFindPasswordVerifyEmail(email, token)
  }

  /** 일반 로그인 서비스 로직*/
  static async attemptNormalLogin(
    normalLoginRequest: NormalLoginRequest,
    res: Response,
  ) {
    const { id, password } = normalLoginRequest
    const memberData: any = await MemberRepository.getNormalLoginData(
      id,
      password,
    )
    if (!memberData) {
      throw ErrorRegistry.CAN_NOT_FIND_USER
    }
    const loginToken: string = Token.generateLoginToken(
      memberData.userId,
      memberData.email,
      memberData.role,
    )
    Token.generateCookie('loginToken', loginToken, res)
  }

  /** 로그인 상태 체크 */
  static async checkLogin(req: Request) {
    if (!req.cookies) {
      throw ErrorRegistry.LOGIN_REQUIRED
    }
    if (!req.cookies.loginToken) {
      throw ErrorRegistry.LOGIN_REQUIRED
    }
    if (!process.env.JWT_SIGNATURE_KEY) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    try {
      jwt.verify(req.cookies.loginToken, process.env.JWT_SIGNATURE_KEY)
      return
    } catch (e) {
      throw ErrorRegistry.LOGIN_REQUIRED
    }
  }

  /** 로그아웃웃 */
  static async logout(res: Response) {
    res.clearCookie('loginToken')
  }
}
