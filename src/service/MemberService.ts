import { postgres } from '#database/postgres'
import FindPasswordRequest from '#dto/request/FindPasswordRequest'
import NicknameChangeRequest from '#dto/request/NicknameChangeRequest'
import SignupRequest from '#dto/request/SignupRequest'
import SignupVerifyRequest from '#dto/request/SignupVerifyRequest'
import ErrorRegistry from '#error/errorRegistry'
import MemberRepository from '#repository/MemberRepository'
import dotenv from 'dotenv'
import { Request } from 'express'
import jwt from 'jsonwebtoken'
import EmailSender from '../email/mailSender/EmailSender.js'
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
        issuer: 'gb6105',
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

  /** 비밀번호 변경 서비스 로직 */
  static async findPassword(findPasswordRequest: FindPasswordRequest) {
    const { id, email } = findPasswordRequest
    await postgres.query(
      'SELECT * FROM test.member WHERE id = $1 AND email = $2',
      [id, email],
    )
  }
}
