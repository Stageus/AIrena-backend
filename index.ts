import { testPostgresConnection } from '#config/postgres'
import { testRedisConnection } from '#config/redis'
import globalExceptionHandler from '#error/globalExceptionHandler'
import { likeRouter } from '#like/router'
import { memberRouter } from '#member/router'
import { mockRouter } from '#mock/router'
import { noticeRouter } from '#notice/router'
import { rankRouter } from '#rank/router'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import express from 'express'
configDotenv()

const app = express()

const corsOptions = {
  origin: 'http://dev.ai-rena.com/',
  method: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
  credentials: true,
}
app.use(cors(corsOptions))

app.use(cookieParser())
app.use(express.json())
app.use('/member', memberRouter)
app.use('/mock', mockRouter)
app.use('/notice', noticeRouter)
app.use('/like', likeRouter)
app.use('/rank', rankRouter)
app.use(globalExceptionHandler)

app.listen(3000, async () => {
  await testPostgresConnection()
  await testRedisConnection()
  console.log('Server is running on port 3000')
})
