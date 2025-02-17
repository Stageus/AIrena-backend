import controller from '#controller'
import express from 'express'
import NicknameChangeRequest from '../entity/dao/frontend/request/NicknameChangeRequest.js'
import PasswordChangeRequest from '../entity/dao/frontend/request/PasswordChangeRequest.js'
import SendFindPasswordEmailRequest from '../entity/dao/frontend/request/SendFindPasswordEmailRequest.js'
import ChangeService from '../service/ChangeService.js'
export const changeRouter = express.Router()

/** 닉네임 변경 API */
changeRouter.patch(
  '/nickname',
  controller(
    'login',
    null,
    null,
    NicknameChangeRequest,
    null,
  )(async (req, res): Promise<any> => {
    await ChangeService.changeNickname(req, req.body)
    return res.sendStatus(200)
  }),
)

/** 비밀번호 변경 API */
changeRouter.patch(
  '/password',
  controller(
    'every',
    null,
    null,
    PasswordChangeRequest,
    null,
  )(async (req, res) => {
    await ChangeService.changePassword(req, req.body)
    return res.sendStatus(200)
  }),
)

/** 비밀번호 찾기 인증 이메일 재전송 API */
changeRouter.get(
  '/password/email',
  controller(
    'every',
    SendFindPasswordEmailRequest,
    null,
    null,
    null,
  )(async (req, res) => {
    await ChangeService.sendPasswordFindEmail(req.query)
    return res.sendStatus(200)
  }),
)
