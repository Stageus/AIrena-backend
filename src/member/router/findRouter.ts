import controller from '#controller'
import express from 'express'
import FindPasswordRequest from '../dao/frontend/request/FindPasswordRequest.js'
export const findRouter = express.Router()

/** 비밀번호 찾기 API */
findRouter.post(
  '/find/password',
  controller(
    null,
    null,
    FindPasswordRequest,
    null,
  )(async (req, res): Promise<any> => {
    await MemberService.findPassword(req.body)
    return res.sendStatus(200)
  }),
)
