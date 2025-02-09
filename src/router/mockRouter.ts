import controller from '#core/controller/index'
import multipartParser from '#core/util/multipartParser'
import MockWriteRequest from '#dto/request/MockWriteRequest/MockWriteRequest'
import MockWriteResponse from '#dto/response/MockWriteResponse'
import MockWriteService from '#service/MockWriteService'
import { randomUUID } from 'crypto'
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
    await MockWriteService.writeMock(2, req.body)
    return res.send(new MockWriteResponse(randomUUID()))
  }),
)
