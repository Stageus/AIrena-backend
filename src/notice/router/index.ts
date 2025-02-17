import express from 'express'
import { listRouter } from './listRouter.js'
import { noticeItemRouter } from './noticeItemRouter.js'
import { writeRouter } from './writeRouter.js'

export const noticeRouter = express.Router()

noticeRouter.use('/', noticeItemRouter)
noticeRouter.use('/list', listRouter)
noticeRouter.use('write', writeRouter)
