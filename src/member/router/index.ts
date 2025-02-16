import controller from '#controller'
import express from 'express'
import MemberService from 'src/member/service/MemberService.js'
import { changeRouter } from './changeRouter.js'
import { findRouter } from './findRouter.js'
import { loginRouter } from './loginRouter.js'
import { signupRouter } from './signupRouter.js'
export const memberRouter = express.Router()

memberRouter.use('/login', loginRouter)
memberRouter.use('/signup', signupRouter)
memberRouter.use('/find', findRouter)
memberRouter.use('/change', changeRouter)

/** 로그아웃 API */
memberRouter.get(
  '/logout',
  controller(
    null,
    null,
    null,
    null,
  )(async (req, res) => {
    await MemberService.logout(res)
    return res.sendStatus(200)
  }),
)
