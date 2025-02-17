import controller from '#controller'
import express from 'express'
import SolveRequest from '../entity/dao/frontend/request/body/SolveRequest.js'
import QuizIdxPath from '../entity/dao/frontend/request/path/QuizIdxPath.js'
import QuizResponse from '../entity/dao/frontend/response/QuizResponse.js'
import QuizSolveResponse from '../entity/dao/frontend/response/QuizSolveResponse.js'
import QuizService from '../service/QuizService.js'

export const quizRouter = express.Router()

quizRouter.get(
  '/:idx',
  controller(
    'login',
    null,
    QuizIdxPath,
    null,
    QuizResponse,
  )(async (req, res) => {
    return res.send(await QuizService.getQuiz(req.params))
  }),
)

quizRouter.post(
  '/:idx',
  controller(
    'login',
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
  '/:idx/result',
  controller(
    'login',
    null,
    QuizIdxPath,
    null,
    QuizSolveResponse,
  )(async (req, res) => {
    return res.send(await QuizService.getGradingResult(2, req.params))
  }),
)
