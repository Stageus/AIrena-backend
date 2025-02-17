import controller from '#controller'
import express from 'express'
import ProfileResponse from '../entity/dao/frontend/response/ProfileResponse.js'
import MeService from '../service/MeService.js'
export const meRouter = express.Router()
/** 프로필 API */
meRouter.get(
  '/profile',
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
