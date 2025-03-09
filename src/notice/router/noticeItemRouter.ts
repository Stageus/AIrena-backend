import controller from '#controller'
import multipartParser from '#util/multipartParser'
import express from 'express'
import NoticeEditBodyRequest from '../entity/dao/frontend/request/NoticeEditBodyRequest.js'
import NoticePathRequest from '../entity/dao/frontend/request/NoticePathRequest.js'
import WriteRequest from '../entity/dao/frontend/request/WriteRequest.js'
import NoticeResponse from '../entity/dao/frontend/response/NoticeResponse.js'
import WriteResponse from '../entity/dao/frontend/response/WriteResponse.js'
import NoticeItemService from '../service/NoticeItemService.js'
import WriteService from '../service/WriteService.js'
export const noticeItemRouter = express.Router()

noticeItemRouter.post(
  '/',
  multipartParser('image', 5),
  controller(
    'admin',
    null,
    null,
    WriteRequest,
    WriteResponse,
  )(async (req, res) => {
    return res.send(await WriteService.writeNotice(req.memberIdx, req.body))
  }),
)

noticeItemRouter.get(
  '/:idx',
  controller(
    'login',
    null,
    NoticePathRequest,
    null,
    NoticeResponse,
  )(async (req, res) => {
    return res.send(await NoticeItemService.getNotice(req.params))
  }),
)

noticeItemRouter.delete(
  '/:idx',
  controller(
    'admin',
    null,
    NoticePathRequest,
    null,
    null,
  )(async (req, res) => {
    await NoticeItemService.deleteNotice(req.params)
    return res.sendStatus(201)
  }),
)

noticeItemRouter.patch(
  '/:idx',
  multipartParser('image', 5),
  controller(
    'admin',
    null,
    NoticePathRequest,
    NoticeEditBodyRequest,
    null,
  )(async (req, res) => {
    await NoticeItemService.editNotice(req.params, req.body)
    return res.sendStatus(201)
  }),
)
