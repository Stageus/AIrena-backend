import controller from '#controller'
import express from 'express'
import ArticleIdxPath from '../entity/dao/frontend/request/path/ArticleIdxPath.js'
import LikeService from '../service/LikeService.js'

export const likeItemRouter = express.Router()

likeItemRouter.post(
  '/:idx',
  controller(
    'login',
    null,
    ArticleIdxPath,
    null,
    null,
  )(async (req, res) => {
    return res.send(
      await LikeService.addLikeToArticle(req.memberIdx, req.params.idx),
    )
  }),
)

likeItemRouter.delete(
  '/:idx',
  controller(
    'login',
    null,
    ArticleIdxPath,
    null,
    null,
  )(async (req, res) => {
    return res.send(
      await LikeService.deleteLikeFromArticle(req.memberIdx, req.params.idx),
    )
  }),
)
