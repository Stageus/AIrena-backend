import { postgres } from '#config/postgres'
import { redis } from '#config/redis'
import ErrorRegistry from '#error/ErrorRegistry'
export default class MemberRepository {
  /**아이디 중복 체크 */
  static async checkIdDuplicate(id: string) {
    const checkId = await postgres.query('SELECT * FROM member WHERE id = $1', [
      id,
    ])
    if (checkId.rowCount == 1) {
      throw ErrorRegistry.DUPLICATED_ID
    }
  }
  /** 이메일 중복 체크 */
  static async checkEmailDuplicate(email: string) {
    const checkEmail = await postgres.query(
      'SELECT * FROM member WHERE email = $1',
      [email],
    )
    if (checkEmail.rowCount == 1) {
      throw ErrorRegistry.DUPLICATED_EMAIL
    }
  }
  /** 저장한 회원 정보를 DB에 저장합니다. */
  static async insertNormalMember(
    id: string,
    password: string,
    email: string,
    nickname: string,
  ) {
    let checkApprove = await redis.hget('email', 'is_approved')
    if (checkApprove != true) {
      let datetime = new Date()
      await postgres.query(
        'INSERT INTO member (id, provider, password, email, nickname,created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [id, 'NORMAL', password, email, nickname, datetime],
      )
    }
  }
  /** 인증 이메일 정보를 저장합니다.  */
  static async saveEmailInfo(email: string): Promise<void> {
    await redis.hset(email, {
      send_count: 1,
    })
  }

  /** 이메일 전송 횟수를 증가 시킵니다. */
  static async increaseEmailCount() {
    await redis.hincrby('email', 'sendCount', 1)
  }

  /** redis에 해당 이메일이 있는지를 확인하여 인증합니다. */
  static async emailCheck(email: string) {
    let emailCheckResult = await redis.hget('email', 'is_approved')
    if (emailCheckResult == 'nil') {
      throw ErrorRegistry.ACCESS_DENIED
    }
    await redis.hset(email, {
      send_count: 1,
      is_approved: true,
    })
  }

  /** 입력받은 닉네임으로 변경합니다. */
  static async changeNickname(nickname: string, id: string) {
    await postgres.query('UPDATE member SET nickname = $1 WHERE id = $2', [
      nickname,
      id,
    ])
  }

  /** 비밀번호 값을 찾아옵니다. 값 없을 때 예외 처리 해야함함 */
  static async getMemberPassword(id: string, email: string) {
    return (
      await postgres.query(
        'SELECT * FROM member WHERE id = $1 AND email = $2',
        [id, email],
      )
    ).rows[0].password
  }

  /** 비밀번호 값을 변경합니다. */
  static async updateMemberPassword(password: string, id: string) {
    return (
      await postgres.query('UPDATE member SET password = $1 WHERE id = $2', [
        password,
        id,
      ])
    ).rows[0]
  }

  /** 로그인 계정 데이터를 가져옵니다. */
  static async getNormalLoginData(id: string, password: string) {
    return (
      await postgres.query(
        'SELECT * FROM member WHERE id = $1 AND password = $2',
        [id, password],
      )
    ).rows[0]
  }
}
