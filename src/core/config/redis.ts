import { Redis } from '@upstash/redis'
import { configDotenv } from 'dotenv'
configDotenv()

export const redis = new Redis({
  url: 'https://diverse-newt-12631.upstash.io',
  token: process.env.UPSTASH_REDIS_TOKEN,
})
