import { postgres } from '#config/postgres'
import ErrorRegistry from '#error/ErrorRegistry'

export default class MemberSignupRepository {
  /** 아이디 & 이메일 중복 체크 */
  static async checkIdAndEmailDuplicate(id: string, email: string) {
    const checkResult = await postgres.query(
      'SELECT CASE WHEN EXISTS(SELECT 1 FROM member WHERE id = $1) THEN $2 ELSE $3 END AS id_status, CASE WHEN EXISTS(SELECT 1 FROM member WHERE email = $4) THEN $5 ELSE $6 END AS email_status',
      [id, 'ID_EXIST', 'ID_NOT_EXIST', email, 'EMAIL_EXIST', 'EMAIL_NOT_EXIST'],
    )
    if ((checkResult.rows[0].id_status as any) === 'ID_EXIST') {
      throw ErrorRegistry.DUPLICATED_ID
    } else if ((checkResult.rows[0].email_status as any) === 'EMAIL_EXIST') {
      throw ErrorRegistry.DUPLICATED_EMAIL
    }
  }
  /** 저장한 회원정보를 DB에 저장 */
  static async insertNormalMemberData(
    id: string,
    password: string,
    email: string,
    nickname: string,
  ) {
    let datetime = new Date()
    await postgres.query(
      'INSERT INTO member (id, provider, password, email, nickname,created_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, 'NORMAL', password, email, nickname, datetime],
    )
  }
}
