import controller from '#controller'
import MockWriteRequest from '#dto/request/MockWriteRequest'
import MockWriteResponse from '#dto/response/MockWriteResponse'
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
