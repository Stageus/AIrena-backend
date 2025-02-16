import { postgres } from '#config/postgres'

export default class MemberFindRepository {
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
