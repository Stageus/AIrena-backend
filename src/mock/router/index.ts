import express from 'express'
import { listRouter } from './listRouter.js'
import { mockItemRouter } from './mockItemRouter.js'
import { quizRouter } from './quizRouter.js'
import { writeRouter } from './writeRouter.js'

export const mockRouter = express.Router()

mockRouter.use('/:idx', mockItemRouter)
mockRouter.use('/list', listRouter)
mockRouter.use('/quiz', quizRouter)
mockRouter.use('/write', writeRouter)
