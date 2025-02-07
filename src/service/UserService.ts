import { postgres } from '#database/postgres'
import FindPasswordRequest from '#dto/request/FindPasswordRequest'
import SignupRequest from '#dto/request/SignupRequest'
import ErrorRegistry from '#error/errorRegistry'
import MemberRepository from '#repository/MemberRepository'

export default class UserService {
  static async signup(signupRequest: SignupRequest) {
    const { id, password, passwordCheck, email } = signupRequest
    if (password != passwordCheck) {
      throw ErrorRegistry.PASSWORD_NOT_EQUAL
    }
    await MemberRepository.insertMember(id, password, email)
  }

  static async findPassword(findPasswordRequest: FindPasswordRequest) {
    const { id, email } = findPasswordRequest
    await postgres.query(
      'SELECT * FROM airena.member WHERE id = $1 AND email = $2',
      [id, email],
    )
  }
}
