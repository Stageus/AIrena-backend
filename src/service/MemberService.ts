import FindPasswordRequest from '#dto/frontend/request/FindPasswordRequest'
import NicknameChangeRequest from '#dto/frontend/request/NicknameChangeRequest'
import NormalLoginRequest from '#dto/frontend/request/NormalLoginRequest'
import PasswordChangeRequest from '#dto/frontend/request/PasswordChangeRequest'
import SignupRequest from '#dto/frontend/request/SignupRequest'
import SignupVerifyRequest from '#dto/frontend/request/SignupVerifyRequest'
import FindPasswordResponse from '#dto/frontend/response/FindPasswordResponse'
import ErrorRegistry from '#error/ErrorRegistry'
import MemberRepository from '#repository/MemberRepository'
import EmailSender from '#util/email/mailSender/EmailSender'
import Token from '#util/Token'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import RandomNicknameGenerator from '../nickname/randomNicknameGenerator.js'
dotenv.config()

export default class MemberService {
  /** 인증 이메일 전송 서비스 로직 */
  static async emailSend(signupRequest: SignupRequest) {
    const { id, password, passwordCheck, email } = signupRequest
    /** 비밀번호 입력 더블 체크 */
    if (password != passwordCheck) {
      throw ErrorRegistry.PASSWORD_NOT_EQUAL
    }
    /** 중복 처리 구간 */
    await MemberRepository.checkIdDuplicate(id)
    await MemberRepository.checkEmailDuplicate(email)
    /** redis에 이메일 정보를 저장합니다.*/
    await MemberRepository.saveEmailInfo(email)
    /** 토큰을 생성 */
    const secretKey: string = process.env.JWT_SIGNATURE_KEY || 'jwt-secret-key'
    const Token = jwt.sign(
      {
        userId: id,
        password: password,
        email: email,
        provider: 'NORMAL',
        role: 'USER',
      },
      secretKey,
      {
        issuer: 'rena',
        expiresIn: '60m',
      },
    )
    /** 토큰을 포함하여 인증 메일을 전송 */
    EmailSender.sendEmail(email, Token)
  }

  /** 회원가입 인증 서비스 로직 */
  static async verifySignup(signupVerifyRequest: SignupVerifyRequest) {
    const { token } = signupVerifyRequest
    const secretKey = process.env.JWT_SIGNATURE_KEY || 'jwt-secret-key'
    const data: any = jwt.verify(token, secretKey)
    const nickname = await RandomNicknameGenerator.generateNickname() // 랜덤 생성기 자리
    /** 이메일 인증 확인 */
    await MemberRepository.emailCheck(data.email)
    /** 이메일 인증 처리 후 토큰 데이터로 DB에 사용자 저장 */
    await MemberRepository.insertNormalMember(
      data.userId,
      data.password,
      data.email,
      nickname,
    ) //
  }

  /** 닉네임 변경 서비스 로직 */
  static async nicknameChange(
    req: Request,
    nicknameChangeRequest: NicknameChangeRequest,
  ) {
    const getToken = (req: Request): string | null => {
      const authHeader = req.headers['authorization']
      if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.slice(7) // "Bearer " 제거 후 토큰 반환
      }
      return null
    }
    const token = getToken(req)
    if (!token) {
      throw new Error('Token not provided or invalid.')
    }

    const secretKey = process.env.JWT_SIGNATURE_KEY || 'jwt-secret-key'
    const data: any = jwt.verify(token, secretKey)
    const { nickname } = nicknameChangeRequest
    await MemberRepository.changeNickname(nickname, data.userId)
  }

  /** 비밀번호 검색 서비스 로직 */
  static async findPassword(findPasswordRequest: FindPasswordRequest) {
    const { id, email } = findPasswordRequest
    const passwordFindResult = await MemberRepository.getMemberPassword(
      id,
      email,
    )
    return new FindPasswordResponse(passwordFindResult)
  }

  /** 비밀번호 변경 서비스 로직 */
  static async changePassword(
    req: Request,
    passwordChangeRequest: PasswordChangeRequest,
  ) {
    const { password } = passwordChangeRequest
    const data: any = Token.getToken(req)
    await MemberRepository.updateMemberPassword(password, data.userId)
  }

  /** 일반 로그인 서브시 로직*/
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
    const secretKey: string = process.env.JWT_SIGNATURE_KEY || 'jwt-secret-key'
    const loginToken = jwt.sign(
      {
        userId: memberData.id,
        password: memberData.password,
        email: memberData.email,
        provider: memberData.provider,
        role: memberData.role,
      },
      secretKey,
      {
        issuer: 'ai-rena',
        expiresIn: '60m',
      },
    )
    res.cookie('loginToken', loginToken, {
      path: '/',
      // domain: process.env.COOKIE_DOMAIN,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
    })
  }
}
