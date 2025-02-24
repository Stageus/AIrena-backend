import controller from '#controller'
import express from 'express'

import MockIdxPath from '../entity/dao/frontend/request/path/MockIdxPath.js'
import DetailResponse from '../entity/dao/frontend/response/DetailResponse.js'
import IndividualMockInfoResponse from '../entity/dao/frontend/response/IndividualMockInfoResponse.js'
import ResultResponse from '../entity/dao/frontend/response/ResultResponse.js'
import MockItemService from '../service/MockItemService.js'

export const mockItemRouter = express.Router()

mockItemRouter.get(
  '/:idx',
  controller(
    'login',
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
    'login',
    null,
    MockIdxPath,
    null,
    ResultResponse,
  )(async (req, res) => {
    return res.send(
      await MockItemService.getMockResult(req.memberIdx, req.params),
    )
  }),
)

mockItemRouter.post(
  '/:idx/result',
  controller(
    'login',
    null,
    MockIdxPath,
    null,
    null,
  )(async (req, res) => {
    await MockItemService.saveMockResult(req.memberIdx, req.params)
    res.sendStatus(201)
  }),
)

mockItemRouter.get(
  '/:idx/individual',
  controller(
    'login',
    null,
    MockIdxPath,
    null,
    IndividualMockInfoResponse,
  )(async (req, res) => {
    return res.send(
      await MockItemService.getIndividualMockInfo(req.memberIdx, req.params),
    )
  }),
)
