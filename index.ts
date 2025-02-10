import { testPostgresConnection } from '#database/postgres'
import globalExceptionHandler from '#error/globalExceptionHandler'
import { loginRouter } from '#router/loginRouter'
import { memberRouter } from '#router/memberRouter'
import { mockRouter } from '#router/mockRouter'
import { testRouter } from '#router/testRouter'
import express from 'express'

const app = express()
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
