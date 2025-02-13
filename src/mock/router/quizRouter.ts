import controller from '#controller'
import express from 'express'
import SolveRequest from '../entity/dao/request/body/SolveRequest.js'
import QuizIdxPath from '../entity/dao/request/path/QuizIdxPath.js'
import QuizResponse from '../entity/dao/response/QuizResponse.js'
import ResultResponse from '../entity/dao/response/ResultResponse.js'
import QuizService from '../service/QuizService.js'

export const quizRouter = express.Router()

quizRouter.get(
  '/:idx',
  controller(
    null,
    QuizIdxPath,
    null,
    QuizResponse,
  )(async (req, res) => {
    return res.send(await QuizService.getMockQuiz(2, req.params))
  }),
)

quizRouter.post(
  '/:idx',
  controller(
    null,
    QuizIdxPath,
    SolveRequest,
    null,
  )(async (req, res) => {
    await QuizService.submitAnswer(2, req.params, req.body)
    res.sendStatus(201)
  }),
)

quizRouter.get(
  '/result',
  controller(
    null,
    QuizIdxPath,
    null,
    ResultResponse,
  )(async (req, res) => {
    return res.send(await QuizService.getGradingResult(2, req.params))
  }),
)
