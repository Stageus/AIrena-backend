import controller from '#controller'
import multipartParser from '#util/multipartParser'
import express from 'express'
import WriteRequest from '../entity/dao/frontend/request/WriteRequest.js'
import WriteResponse from '../entity/dao/frontend/response/WriteResponse.js'
import WriteService from '../service/WriteService.js'
export const writeRouter = express.Router()

writeRouter.get(
  '/',
  multipartParser('images', 5),
  controller(
    null,
    null,
    WriteRequest,
    WriteResponse,
  )(async (req, res) => {
    await WriteService.writeNotice(req.body)
  }),
)
