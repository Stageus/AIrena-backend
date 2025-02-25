import express from 'express'
import { rankListRouter } from './rankListRouter.js'

export const rankRouter = express.Router()

rankRouter.use('/', rankListRouter)
