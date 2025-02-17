import ErrorRegistry from '#error/ErrorRegistry'
import EmailSender from '#util/email/mailSender/index'
import Token from '#util/token/index'
import dotenv from 'dotenv'
import { Request } from 'express'
import jwt from 'jsonwebtoken'
import NicknameChangeRequest from '../entity/dao/frontend/request/NicknameChangeRequest.js'
import PasswordChangeRequest from '../entity/dao/frontend/request/PasswordChangeRequest.js'
import SendFindPasswordEmailRequest from '../entity/dao/frontend/request/SendFindPasswordEmailRequest.js'
import MemberChangeRepository from '../repository/MemberChangeRepository.js'
import RedisEmailChangeRepository from '../repository/RedisEmailChangeRepository.js'
dotenv.config()
export default class ChangeService {
  /** 닉네임 변경 서비스 로직 */
  static async changeNickname(
    req: Request,
    nicknameChangeRequest: NicknameChangeRequest,
  ) {
    const data = Token.getDataFromToken(req)
    const { nickname } = nicknameChangeRequest
    await MemberChangeRepository.changeNickname(nickname, data.userId)
  }

  /** 비밀번호 변경 서비스 로직 */
  static async changePassword(
    req: Request,
    passwordChangeRequest: PasswordChangeRequest,
  ) {
    const { password, token } = passwordChangeRequest
    try {
      if (!process.env.JWT_SIGNATURE_KEY) {
        throw ErrorRegistry.TOKEN_REQUIRED
      }
      const secretKey = process.env.JWT_SIGNATURE_KEY
      const data: any = jwt.verify(token, secretKey)
      await MemberChangeRepository.updateMemberPassword(password, data.userId)
      return
    } catch (e) {
      console.error(e)
      throw ErrorRegistry.PASSWORD_CHANGE_FAILED
    }
  }

  /** 비밀번호 찾기 인증 이메일 재전송 서비스 로직 */
  static async sendPasswordFindEmail(
    sendFindPasswordEmailRequest: SendFindPasswordEmailRequest,
  ) {
    const { id, email } = sendFindPasswordEmailRequest
    const token = Token.generateVerifyToken(id, email)
    await RedisEmailChangeRepository.checkFindPasswordEmailDataFromRedis(
      email,
      token,
    )
    EmailSender.sendFindPasswordVerifyEmail(email, token)
  }
}
