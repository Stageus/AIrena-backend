import controller from '#controller'
import SubmitAnswerRequest from '#dto/frontend/request/AnswerSubmitRequest'
import MockDetailRequest from '#dto/frontend/request/MockDetailRequest'
import MockListRequest from '#dto/frontend/request/MockListRequest'
import MockQuizRequest from '#dto/frontend/request/MockQuizRequest'
import MockSearchRequest from '#dto/frontend/request/MockSearchRequest'
import MockWriteRequest from '#dto/frontend/request/MockWriteRequest'
import AnswerSubmitResponse from '#dto/frontend/response/AnswerSubmitResponse'
import MockDetailResponse from '#dto/frontend/response/MockDetailResponse'
import MockListResponse from '#dto/frontend/response/MockListResponse'
import MockQuizResponse from '#dto/frontend/response/MockQuizResponse'
import MockResultResponse from '#dto/frontend/response/MockResultReponse'
import MockWriteResponse from '#dto/frontend/response/MockWriteResponse'
import AnswerSubmitService from '#service/AnswerSubmitService'
import MockGetService from '#service/MockGetService'
import MockWriteService from '#service/MockWriteService'
import multipartParser from '#util/multipartParser'
import express from 'express'

export const mockRouter = express.Router()

mockRouter.post(
  '/write',
  multipartParser('image', 1),
  controller(
    null,
    null,
    MockWriteRequest,
    MockWriteResponse,
  )(async (req, res) => {
    return res.send(await MockWriteService.writeMock(2, req.body))
  }),
)

mockRouter.get(
  '/search',
  controller(
    MockSearchRequest,
    null,
    null,
    MockListResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.searchMock(req.query))
  }),
)

mockRouter.get(
  '/list',
  controller(
    MockListRequest,
    null,
    null,
    MockListResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.getMockList(req.query))
  }),
)

mockRouter.get(
  '/:idx',
  controller(
    null,
    MockDetailRequest,
    null,
    MockDetailResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.getMockDetail(req.params))
  }),
)

mockRouter.get(
  '/solve/:idx',
  controller(
    null,
    MockQuizRequest,
    null,
    MockQuizResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.getMockQuiz(2, req.params))
  }),
)

mockRouter.post(
  '/solve/:idx',
  controller(
    null,
    MockQuizRequest,
    SubmitAnswerRequest,
    AnswerSubmitResponse,
  )(async (req, res) => {
    return res.send(
      await AnswerSubmitService.submitAnswer(2, req.params, req.body),
    )
  }),
)

mockRouter.get(
  '/result/:idx',
  controller(
    null,
    MockQuizRequest,
    SubmitAnswerRequest,
    MockResultResponse,
  )(async (req, res) => {
    return res.send(await MockGetService.getMockResult(2, req.params))
  }),
)
