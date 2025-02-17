import controller from '#controller'
import express from 'express'
import LogoutService from '../service/LogoutService.js'
export const logoutRouter = express.Router()
/** 로그아웃 API */
logoutRouter.get(
  '/',
  controller(
    'every',
    null,
    null,
    null,
    null,
  )(async (req, res) => {
    await LogoutService.logout(res)
    return res.sendStatus(200)
  }),
)
