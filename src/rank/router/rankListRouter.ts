import controller from '#controller'
import express from 'express'
import FilteredRankListRequest from '../entity/dao/request/FilteredRankListRequest.js'
import RankListRequest from '../entity/dao/request/RankListRequest.js'
import FilteredRankListResponse from '../entity/dao/response/FilteredRankListResponse.js'
import RankListResponse from '../entity/dao/response/RankListResponse.js'
import RankListService from '../service/rankListService.js'

export const rankListRouter = express.Router()

rankListRouter.get(
  '/',
  controller(
    'login',
    RankListRequest,
    null,
    null,
    RankListResponse,
  )(async (req, res) => {
    return await RankListService.getRankList(req.query)
  }),
)

rankListRouter.get(
  '/search',
  controller(
    'login',
    FilteredRankListRequest,
    null,
    null,
    FilteredRankListResponse,
  )(async (req, res) => {
    return await RankListService.getFilteredRankList(req.query)
  }),
)
