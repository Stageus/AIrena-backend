import express from 'express'
import globalExceptionHandler from '#error/globalExceptionHandler'
import { loginRouter } from '#router/loginRouter'
import { testRouter } from '#router/testRouter'
import { testPostgresConnection } from '#database/postgres'

const app = express()
app.use(express.json())
app.use('/login', loginRouter)
app.use('/test', testRouter)
app.use(globalExceptionHandler)

app.listen(3000, async () => {
  await testPostgresConnection()
  console.log('Server is running on port 3000')
})
