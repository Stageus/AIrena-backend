import controller from '#controller'
import multipartParser from '#util/multipartParser'
import express from 'express'
import NoticeDeletePathRequest from '../entity/dao/frontend/request/NoticeDeletePathRequest.js'
import NoticeEditBodyRequest from '../entity/dao/frontend/request/NoticeEditBodyRequest.js'
import NoticeEditPathRequest from '../entity/dao/frontend/request/NoticeEditPathRequest.js'
import NoticePathRequest from '../entity/dao/frontend/request/NoticePathRequest.js'
import NoticePathResponse from '../entity/dao/frontend/response/NoticePathResponse.js'
import NoticeItemService from '../service/NoticeItemService.js'
export const noticeItemRouter = express.Router()

noticeItemRouter.get(
  '/:idx',
  controller(
    null,
    NoticePathRequest,
    null,
    NoticePathResponse,
  )(async (req, res) => {
    return res.send(await NoticeItemService.getNotice(req.params))
  }),
)

noticeItemRouter.delete(
  '/:idx',
  controller(
    null,
    NoticeDeletePathRequest,
    null,
    null,
  )(async (req, res) => {
    await NoticeItemService.deleteNotice(req.params)
    return res.sendStatus(201)
  }),
)

noticeItemRouter.patch(
  '/:idx',
  multipartParser('image', 1),
  controller(
    null,
    NoticeEditPathRequest,
    NoticeEditBodyRequest,
    null,
  )(async (req, res) => {
    await NoticeItemService.editNotice(req.params, req.body)
    return res.sendStatus(201)
  }),
)
