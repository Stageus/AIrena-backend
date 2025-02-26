import controller from '#controller'
import multipartParser from '#util/multipartParser'
import express from 'express'
import NoticeEditBodyRequest from '../entity/dao/frontend/request/NoticeEditBodyRequest.js'
import NoticePathRequest from '../entity/dao/frontend/request/NoticePathRequest.js'
import NoticePathResponse from '../entity/dao/frontend/response/NoticeResponse.js'
import NoticeItemService from '../service/NoticeItemService.js'
export const noticeItemRouter = express.Router()

noticeItemRouter.get(
  '/:idx',
  controller(
    'login',
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
