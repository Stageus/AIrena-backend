import express from 'express'
import { addRouter } from './addRouter.js'
import { deleteRouter } from './deleteRouter.js'

export const likeRouter = express.Router()

likeRouter.use('/add', addRouter)
likeRouter.use('/delete', deleteRouter)
