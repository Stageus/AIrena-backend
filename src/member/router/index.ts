import express from 'express'
import { changeRouter } from './changeRouter.js'
import { findRouter } from './findRouter.js'
import { loginRouter } from './loginRouter.js'
import { logoutRouter } from './logoutRouter.js'
import { signupRouter } from './signupRouter.js'
export const memberRouter = express.Router()

memberRouter.use('/login', loginRouter)
memberRouter.use('/signup', signupRouter)
memberRouter.use('/find', findRouter)
memberRouter.use('/change', changeRouter)
memberRouter.use('/logout', logoutRouter)
