import controller from '#controller'
import express from 'express'
import ListRequest from '../entity/dao/frontend/request/ListRequest.js'
import ListSearchRequest from '../entity/dao/frontend/request/ListSearchRequest.js'
import ListResponse from '../entity/dao/frontend/response/ListResponse.js'
import ListSearchResponse from '../entity/dao/frontend/response/ListSearchResponse.js'
import ListService from '../service/ListService.js'
export const listRouter = express.Router()

listRouter.get(
  '/',
  controller(
    ListRequest,
    null,
    null,
    ListResponse,
  )(async (req, res) => {
    console.log('라우터터')
    // return res.send(await ListService.getList(req.query))
  }),
)
listRouter.get(
  '/search',
  controller(
    ListSearchRequest,
    null,
    null,
    ListSearchResponse,
  )(async (req, res) => {
    return res.send(await ListService.searchList(req.query))
  }),
)
