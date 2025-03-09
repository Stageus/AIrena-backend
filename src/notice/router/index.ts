import express from 'express'
import { listRouter } from './listRouter.js'
import { noticeItemRouter } from './noticeItemRouter.js'

export const noticeRouter = express.Router()

noticeRouter.use('/list', listRouter)
noticeRouter.use('/', noticeItemRouter)
