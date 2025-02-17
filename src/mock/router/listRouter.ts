import controller from '#controller'
import express from 'express'

import ListQuery from '../entity/dao/frontend/request/query/ListRequest.js'
import SearchQuery from '../entity/dao/frontend/request/query/SearchRequest.js'
import ListResponse from '../entity/dao/frontend/response/ListResponse.js'
import ListService from '../service/ListService.js'

export const listRouter = express.Router()

listRouter.get(
  '/',
  controller(
    'login',
    ListQuery,
    null,
    null,
    ListResponse,
  )(async (req, res) => {
    return res.send(await ListService.getMockList(req.query))
  }),
)

listRouter.get(
  '/search',
  controller(
    'login',
    SearchQuery,
    null,
    null,
    ListResponse,
  )(async (req, res) => {
    return res.send(await ListService.searchMock(req.query))
  }),
)
