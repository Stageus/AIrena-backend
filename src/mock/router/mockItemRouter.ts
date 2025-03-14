import controller from '#controller'
import express from 'express'

import multipartParser from '#util/multipartParser'
import MockEditRequest from '../entity/dao/frontend/request/body/MockEditRequest.js'
import WriteRequest from '../entity/dao/frontend/request/body/WriteRequest.js'
import MockIdxPath from '../entity/dao/frontend/request/path/MockIdxPath.js'
import DetailResponse from '../entity/dao/frontend/response/DetailResponse.js'
import IndividualMockInfoResponse from '../entity/dao/frontend/response/IndividualDetailResponse.js'
import ResultResponse from '../entity/dao/frontend/response/ResultResponse.js'
import WriteResponse from '../entity/dao/frontend/response/WriteResponse.js'
import MockItemService from '../service/MockItemService.js'
import WriteService from '../service/WriteService.js'

export const mockItemRouter = express.Router()

mockItemRouter.post(
  '/',
  multipartParser('image', 1),
  controller(
    'login',
    null,
    null,
    WriteRequest,
    WriteResponse,
  )(async (req, res) => {
    return res.send(await WriteService.writeMock(req.memberIdx, req.body))
  }),
)

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

mockItemRouter.delete(
  '/:idx',
  controller(
    'login',
    null,
    MockIdxPath,
    null,
    null,
  )(async (req, res) => {
    await MockItemService.deleteMock(req.memberIdx, req.params)
    res.sendStatus(200)
  }),
)

mockItemRouter.patch(
  '/:idx',
  multipartParser('image', 1),
  controller(
    'login',
    null,
    MockIdxPath,
    MockEditRequest,
    null,
  )(async (req, res) => {
    await MockItemService.editMock(req.memberIdx, req.params, req.body)
    res.sendStatus(200)
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
      await MockItemService.getIndividualMockDetail({
        memberIdx: req.memberIdx,
        path: req.params,
      }),
    )
  }),
)
