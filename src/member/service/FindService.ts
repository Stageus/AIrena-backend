import ErrorRegistry from '#error/ErrorRegistry'
import EmailSender from '#util/email/mailSender/index'
import Token from '#util/token/index'
import FindPasswordRequest from '../entity/dao/frontend/request/FindPasswordRequest.js'
import MemberFindRepository from '../repository/MemberFindRepository.js'
export default class FindService {
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
    EmailSender.sendFindPasswordVerifyEmail(email, token)
  }
}
