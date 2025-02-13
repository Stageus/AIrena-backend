import controller from '#controller'
import express from 'express'

import MockIdxPath from '../entity/dao/frontend/request/path/MockIdxPath.js'
import DetailResponse from '../entity/dao/frontend/response/DetailResponse.js'
import ResultResponse from '../entity/dao/frontend/response/ResultResponse.js'
import MockItemService from '../service/MockItemService.js'

export const mockItemRouter = express.Router()

mockItemRouter.get(
  '/:idx',
  controller(
    null,
    MockIdxPath,
    null,
    DetailResponse,
  )(async (req, res) => {
    return res.send(await MockItemService.getMockDetail(req.params))
  }),
)

mockItemRouter.get(
  '/:idx/result',
  controller(
    null,
    MockIdxPath,
    null,
    ResultResponse,
  )(async (req, res) => {
    return res.send(await MockItemService.getMockResult(2, req.params))
  }),
)

mockItemRouter.post(
  '/:idx/result',
  controller(
    null,
    MockIdxPath,
    null,
    null,
  )(async (req, res) => {
    await MockItemService.saveMockResult(2, req.params)
    res.sendStatus(201)
  }),
)
