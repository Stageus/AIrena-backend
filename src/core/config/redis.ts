import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

export default class RedisReset {
  static clearExpiredMemberData = () => {
    let currentTime = Date.now()
  }
}

export const testRedisConnection = async () => {
  try {
    await redis.set('test_key', 'Hello, Upstash!')
    const value = await redis.get('test_key')
    console.log('|========== Upstash Redis 연결 성공 =========|', value)
  } catch (error) {
    console.error('Redis 연결 실패:', error)
  }
}
