import { redis } from '#config/redis'
import ErrorRegistry from '#error/ErrorRegistry'

export default class RedisEmailChangeRepository {
  /**
   * 비밀번호 찾기 인증 이메일 정보를 저장합니다.
   */
  static async checkFindPasswordEmailDataFromRedis(
    email: string,
    token: string,
  ) {
    const checkHashData = await redis.exists(email)
    if (checkHashData == 0) {
      const now = new Date()
      await redis.hset(email, {
        send_count: 1,
        token: token,
        created_at: now,
      })
      now.setHours(24, 0, 0, 0)
      const expireTime = Math.floor(now.getTime() / 1000)
      await redis.expireat(email, expireTime)
    } else {
      let mailSendCount: any = await redis.hget(email, 'send_count')
      if (mailSendCount >= 5) {
        throw ErrorRegistry.TOO_MUCH_VERIFY_ATTEMPT
      }
      await redis.hincrby(email, 'send_count', 1)
    }
  }

  static async resetFindPasswordEmailDataFromRedis(email: string) {
    await redis.del(email)
  }
}
