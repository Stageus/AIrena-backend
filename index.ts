import { testPostgresConnection } from '#config/postgres'
import globalExceptionHandler from '#error/globalExceptionHandler'
import { loginRouter } from '#router/loginRouter'
import { memberRouter } from '#router/memberRouter'
import { mockRouter } from '#router/mockRouter'
import { testRouter } from '#router/testRouter'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import express from 'express'
configDotenv()

const app = express()
app.use(
  cors({
    origin: process.env.FRONTEND_SERVER_URL, // 허용할 출처
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // 모든 HTTP 메소드 명시
    credentials: true, // 쿠키 전송 허용 여부
  }),
)

app.use(express.json())
app.use('/member', memberRouter)
app.use('/login', loginRouter)
app.use('/mock', mockRouter)
app.use('/test', testRouter)
app.use(globalExceptionHandler)

app.listen(3000, async () => {
  await testPostgresConnection()
  console.log('Server is running on port 3000')
})
