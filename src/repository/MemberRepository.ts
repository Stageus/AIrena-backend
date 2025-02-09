import { postgres } from '#database/postgres'
import { redis } from '#database/redis'
import ErrorRegistry from '#error/errorRegistry'
export default class MemberRepository {
  /** 저장한 회원 정보를 DB에 저장합니다. */
  static async insertNormalMember(id: string, password: string, email: string) {
    await postgres.query(
      'INSERT INTO member (id, provider, password, email, nickname) VALUES ($1, $2, $3, $4, $5)',
      [id, 'NORMAL', password, email, 'test1'],
    )
  }
  /** 인증 이메일 정보를 저장합니다.  */
  static async saveEmailInfo(email: string): Promise<void> {
    await redis.hset('email', {
      address: email,
      send_count: 1,
      is_approved: false,
    })
    console.log(await redis.hget('email', 'address'))
    console.log(await redis.hget('email', 'send_count'))
    console.log(await redis.hget('email', 'is_approved'))
  }

  /** 이메일 전송 횟수를 증가 시킵니다. */
  static async inceaseEmailCount() {
    await redis.hincrby('email', 'sendCount', 1)
    console.log(await redis.hget('email', 'address'))
    console.log(await redis.hget('email', 'sendCount'))
  }

  /** 이메일을 인증상태로 변경합니다. */
  static async approveEmail(email: string) {
    let checkApprove = await redis.hget('email', 'is_approved')
    //이미 이메일 인증을 진행한 사람 인경우우
    if (checkApprove == true) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    await redis.hset('email', {
      address: email,
      send_count: 1,
      is_approved: true,
    })
  }
}
