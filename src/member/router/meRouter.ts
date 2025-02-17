import controller from '#controller'
import express from 'express'
import ProfileResponse from '../entity/dao/frontend/response/ProfileResponse.js'
import MeService from '../service/MeService.js'
export const logoutRouter = express.Router()
/** 로그아웃 API */
logoutRouter.get(
  '/',
  controller(
    'login',
    null,
    null,
    null,
    ProfileResponse,
  )(async (req, res) => {
    return res.send(await MeService.getProfile(req.memberIdx))
  }),
)
