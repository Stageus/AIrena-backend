import controller from '#controller'
import MockSearchRequest from '#dto/frontend/request/MockSearchRequest'
import MockWriteRequest from '#dto/frontend/request/MockWriteRequest'
import MockSearchResponse from '#dto/frontend/response/MockSearchResponse'
import MockWriteResponse from '#dto/frontend/response/MockWriteResponse'
import MockInfoService from '#service/MockInfoService'
import MockWriteService from '#service/MockWriteService'
import multipartParser from '#util/multipartParser'
import express from 'express'

export const mockRouter = express.Router()

mockRouter.post(
  '/write',
  multipartParser('image', 1),
  controller(
    null,
    null,
    MockWriteRequest,
    MockWriteResponse,
  )(async (req, res) => {
    return res.send(await MockWriteService.writeMock(2, req.body))
  }),
)

mockRouter.get(
  '/search',
  controller(
    MockSearchRequest,
    null,
    null,
    MockSearchResponse,
  )(async (req, res) => {
    return res.send(await MockInfoService.getMockList(req.query))
  }),
)
