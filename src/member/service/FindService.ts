import ErrorRegistry from '#error/ErrorRegistry'
import EmailSender from '#util/EmailSender'
import Token from '#util/Token'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import FindIdRequest from '../entity/dao/frontend/request/FindIdRequest.js'
import FindPasswordRequest from '../entity/dao/frontend/request/FindPasswordRequest.js'
import FindPasswordVerifyRequest from '../entity/dao/frontend/request/FindPasswordVerifyRequest.js'
import FindIdResponse from '../entity/dao/frontend/response/FindIdResponse.js'
import MemberFindRepository from '../repository/MemberFindRepository.js'
import RedisEmailFindRepository from '../repository/RedisEmailFindRepository.js'
const changePasswordRedirectUrl = `${process.env.FRONTEND_SERVER_URL}/redirect/change/password`
export default class FindService {
  /** 아이디 검색 서비스 로직 */
  static async findId(findIdRequest: FindIdRequest) {
    const { email } = findIdRequest
    const result = await MemberFindRepository.getIdByEmail(email)
    if (!result) {
      throw ErrorRegistry.CAN_NOT_FIND_USER
    }

    return new FindIdResponse(result.id)
  }

  /** 비밀번호 검색 서비스 로직 */
  static async findPassword(findPasswordRequest: FindPasswordRequest) {
    const { id, email } = findPasswordRequest
    const checkResult = await MemberFindRepository.checkMemberPasswordFromDb(
      id,
      email,
    )
    if (checkResult == 0) {
      throw ErrorRegistry.CAN_NOT_FIND_USER
    }
    const token = Token.generateVerifyToken(id, email)
    await RedisEmailFindRepository.insertMemberDataAtRedis(id, email, token)
    EmailSender.sendFindPasswordVerifyEmail(email, token)
  }
  /** 비밀번호 이메일 인증 서비스 로직 */
  static async verifyFindPassword(
    findPasswordVerifyRequest: FindPasswordVerifyRequest,
    res: Response,
  ) {
    const getToken = findPasswordVerifyRequest.token
    if (!process.env.JWT_SIGNATURE_KEY)
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    const data: any = jwt.verify(getToken, process.env.JWT_SIGNATURE_KEY)
    const checkRedis =
      await RedisEmailFindRepository.checkVerifyEmailDataFromRedis()
    if (!checkRedis) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    const memberHashData: any =
      await RedisEmailFindRepository.getHashDataFromRedis(data.email)
    const token = Token.generateValidateToken(memberHashData.id, data.email)
    Token.generateCookie('passwordChangeToken', token, res)
    return changePasswordRedirectUrl
  }
}
