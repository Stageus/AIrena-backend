import { redis } from '#config/redis'
import ErrorRegistry from '#error/ErrorRegistry'

export default class RedisEmailFindRepository {
  /** 비밀번호 변경 시도 시, 이메일 인증을 위하여 입력받은 정보를 redis에 저장해둡니다.  */
  static async insertMemberDataAtRedis(
    id: string,
    email: string,
    token: string,
  ): Promise<void> {
    const now = new Date() // 현재 시간
    await redis.hset(email, {
      id: id,
      send_count: 1,
      is_approved: false,
      created_at: now,
      token: token,
    })
    now.setHours(24, 0, 0, 0) // 현재 시간에서 다음날 00시로 설정
    const expireTime = Math.floor(now.getTime() / 1000) // Unix 타임스탬프 (초 단위)
    await redis.expireat(email, expireTime)
  }
  /** 이메일 인증
   * redis에 해당 이메일이 있는지를 확인하여 인증합니다. */
  static async checkVerifyEmailDataFromRedis() {
    let emailCheckResult = await redis.hget('email', 'is_approved')
    if (emailCheckResult == 'nil') {
      throw ErrorRegistry.ACCESS_DENIED
    }
    return true
  }
  /** Redis에 저장된 필드값을 모두 가져옵니다.  */
  static async getHashDataFromRedis(email: string) {
    const hashData = await redis.hgetall(email)
    if (!hashData) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    return hashData
  }
}
