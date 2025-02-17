import controller from '#controller'
import express from 'express'
import FindPasswordRequest from '../entity/dao/frontend/request/FindPasswordRequest.js'
import FindPasswordVerifyRequest from '../entity/dao/frontend/request/FindPasswordVerifyRequest.js'
import FindService from '../service/FindService.js'
export const findRouter = express.Router()

/** 비밀번호 찾기 API */
findRouter.post(
  '/password',
  controller(
    null,
    null,
    FindPasswordRequest,
    null,
  )(async (req, res): Promise<any> => {
    await FindService.findPassword(req.body)
    return res.sendStatus(200)
  }),
)

findRouter.post(
  '/password/verify',
  controller(
    FindPasswordVerifyRequest,
    null,
    null,
    null,
  )(async (req, res) => {
    const url = await FindService.verifyFindPassword(req.query, res)
    return res.redirect(url)
  }),
)
