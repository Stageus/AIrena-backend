import controller from '#controller'
import MockWriteRequest from '#dto/request/MockWriteRequest'
import MockWriteResponse from '#dto/response/MockWriteResponse'
import MockWriteService from '#service/MockWriteService'
import multipartParser from '#util/multipartParser'
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
