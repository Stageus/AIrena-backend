import { redis } from '#config/redis'
import ErrorRegistry from '#error/ErrorRegistry'

export default class RedisSignupRepository {
  /** 회원가입 시, 이메일 인증을 위하여 입력받은 정보를 redis에 저장해둡니다.  */
  static async insertMemberDataAtRedis(
    id: string,
    password: string,
    email: string,
  ): Promise<void> {
    const now = new Date() // 현재 시간
    await redis.hset(email, {
      id: id,
      password: password,
      send_count: 1,
      is_approved: false,
      created_at: now,
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

  /** 이메일 인증을 위한 데이터를 redis에 저장합니다. */
  static async func(email: string) {
    await redis.hset(email, {
      send_count: 1,
      is_approved: true,
    })
  }
  /** Redis에 저장된 필드값을 모두 가져옵니다.  */
  static async getHashDataFromRedis(email: string) {
    const hashData = await redis.hgetall(email)
    if (!hashData) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    return hashData
  }

  /** 인증 이메일 재전송
   *  이메일 전송 횟수를 확인하고 횟수를 증가시킵니다.*/
  static async increaseVerifyEmailDataFromRedis(email: string) {
    let mailSendCount: any = await redis.hget(email, 'send_count')
    if (mailSendCount >= 5) {
      throw ErrorRegistry.TOO_MUCH_VERIFY_ATTEMPT
    }
    await redis.hincrby(email, 'send_count', 1)
  }
}
