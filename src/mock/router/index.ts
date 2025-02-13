import express from 'express'
import { listRouter } from './listRouter.js'
import { mockItemRouter } from './mockItemRouter.js'
import { quizRouter } from './quizRouter.js'
import { writeRouter } from './writeRouter.js'

// import { mockItemRouter } from './mockItemRouter.js'
// import { quizRouter } from './quizRouter.js'

export const mockRouter = express.Router()

mockRouter.use('/list', listRouter)
mockRouter.use('/write', writeRouter)
mockRouter.use('/', mockItemRouter)
mockRouter.use('/quiz', quizRouter)
