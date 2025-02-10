import controller from '#controller'
import MockListRequest from '#dto/frontend/request/MockListRequest'
import MockSearchRequest from '#dto/frontend/request/MockSearchRequest'
import MockWriteRequest from '#dto/frontend/request/MockWriteRequest'
import MockListResponse from '#dto/frontend/response/MockListResponse'
import MockWriteResponse from '#dto/frontend/response/MockWriteResponse'
import MockGetService from '#service/MockGetService'
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
    MockListResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.searchMock(req.query))
  }),
)

mockRouter.get(
  '/list',
  controller(
    MockListRequest,
    null,
    null,
    MockListResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.getMockList(req.query))
  }),
)

mockRouter.get(
  '/:idx',
  controller(
    MockListRequest,
    null,
    null,
    MockListResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.getMockList(req.query))
  }),
)
