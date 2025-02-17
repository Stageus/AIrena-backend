import controller from '#controller'
import express from 'express'
import FindIdRequest from '../entity/dao/frontend/request/FindIdRequest.js'
import FindPasswordRequest from '../entity/dao/frontend/request/FindPasswordRequest.js'
import FindPasswordVerifyRequest from '../entity/dao/frontend/request/FindPasswordVerifyRequest.js'
import FindIdResponse from '../entity/dao/frontend/response/FindIdResponse.js'
import FindService from '../service/FindService.js'
export const findRouter = express.Router()

/** 아이디 찾기 API */
findRouter.post(
  '/id',
  controller(
    null,
    null,
    FindIdRequest,
    FindIdResponse,
  )(async (req, res): Promise<any> => {
    return res.send(await FindService.findId(req.body))
  }),
)

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
