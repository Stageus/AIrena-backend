import express from 'express'

export const mockRouter = express.Router()

mockRouter.use('/', likeItemRouter)
