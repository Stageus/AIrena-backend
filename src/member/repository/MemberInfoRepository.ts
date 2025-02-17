import { postgres } from '#config/postgres'
import ProfileResultFromDB from '../entity/dao/db/ProfileResultFromDB.js'

export default class MemberInfoRepository {
  /** 내 정보 가져오기 */
  static async getProfile(memberIdx: number) {
    return (
      await postgres.query('SELECT nickname FROM member WHERE idx = $1', [
        memberIdx,
      ])
    ).rows[0] as ProfileResultFromDB
  }
}
