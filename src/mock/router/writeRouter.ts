import controller from '#controller'
import multipartParser from '#util/multipartParser'
import express from 'express'
import WriteRequest from '../entity/dao/frontend/request/body/WriteRequest.js'
import WriteResponse from '../entity/dao/frontend/response/WriteResponse.js'
import WriteService from '../service/WriteService.js'

export const writeRouter = express.Router()

writeRouter.post(
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
