import { postgres } from '#config/postgres'
import IdResultFromDB from '../entity/dao/db/IdResultFromDB.js'

export default class MemberFindRepository {
  /** 아이디 찾기 */
  static async getIdByEmail(email: string) {
    return (
      await postgres.query('SELECT id FROM member WHERE email = $1', [email])
    ).rows[0] as IdResultFromDB
  }

  /** 비밀번호 찾기 */
  static async checkMemberPasswordFromDb(id: string, email: string) {
    return (
      await postgres.query(
        'SELECT 1 FROM member WHERE id = $1 AND email = $2',
        [id, email],
      )
    ).rowCount
  }
}
