import controller from '#controller'
import express from 'express'
import ListRequest from '../entity/dao/frontend/request/ListRequest.js'
import ListResponse from '../entity/dao/frontend/response/ListResponse.js'
import ListService from '../service/ListService.js'
export const listRouter = express.Router()

listRouter.get(
  '/',
  controller(
    'login',
    ListRequest,
    null,
    null,
    ListResponse,
  )(async (req, res) => {
    return res.send(await ListService.getList(req.query))
  }),
)
