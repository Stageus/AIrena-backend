import controller from '#controller'
import express from 'express'
import ListQuery from '../entity/dao/request/query/ListRequest.js'
import SearchQuery from '../entity/dao/request/query/SearchRequest.js'
import ListResponse from '../entity/dao/response/ListResponse.js'
import ListService from '../service/ListService.js'

export const listRouter = express.Router()

listRouter.get(
  '/',
  controller(
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
    SearchQuery,
    null,
    null,
    ListResponse,
  )(async (req, res) => {
    return res.send(await ListService.searchMock(req.query))
  }),
)
