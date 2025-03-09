import express from 'express'
import { likeItemRouter } from './likeItemRouter.js'

export const likeRouter = express.Router()

likeRouter.use('/:idx', likeItemRouter)
