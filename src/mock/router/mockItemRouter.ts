import controller from '#controller'
import MockResultResponse from '#dto/frontend/response/MockResultResponse'
import MockGetService from '#service/MockGetService'
import express from 'express'
import MockIdxPath from '../entity/dao/request/path/MockIdxPath.js'
import DetailResponse from '../entity/dao/response/DetailResponse.js'
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
    MockResultResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.getMockResult(2, req.params))
  }),
)
