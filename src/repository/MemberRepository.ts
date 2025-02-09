import { postgres } from '#database/postgres'
import { redis } from '#database/redis'
export default class MemberRepository {
  /** 저장한 회원 정보를 DB에 저장합니다. */
  static async insertNormalMember(id: string, password: string, email: string) {
    await postgres.query(
      'INSERT INTO member (id, provider, password, email, nickname) VALUES ($1, $2, $3, $4, $5)',
      [id, 'NORMAL', password, email, 'test1'],
    )
  }
  /** 인증 이메일 정보를 저장합니다.  */
  static async emailInfoSave(email: string, count: number = 1): Promise<void> {
    await redis.hset('email', { address: email, sendCount: 1 })
    console.log(await redis.hget('email', 'address'))
    console.log(await redis.hget('email', 'sendCount'))
  }
}
