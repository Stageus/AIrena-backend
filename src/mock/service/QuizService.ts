import MockAdapter from '#adapter/MockAdapter'
import MockQuizResponse from '#dto/frontend/response/MockQuizResponse'
import ErrorRegistry from '#error/ErrorRegistry'
import AnswerSubmitRepository from 'src/mock/repository/AnswerSubmitRepository.js'
import QuizRepository from 'src/mock/repository/QuizRepository.js'
import { Q } from 'node_modules/@upstash/redis/zmscore-C3G81zLz.mjs'
import SolveRequest from '../entity/dao/request/body/SolveRequest.js'
import QuizIdxPath from '../entity/dao/request/path/QuizIdxPath.js'
import QuizResponse from '../entity/dao/response/QuizResponse.js'
import ResultResponse from '../entity/dao/response/ResultResponse.js'
import MockScoreRepository from 'src/mock/repository/MockScoreRepository.js'
import AIAdapter from 'src/core/adapter/AIAdapter.js'
import SolveResponse from '../entity/dao/response/SolveResponse.js'

export default class QuizService {
  static MAX_SCORE: number = 100

  static async getMockQuiz(
    memberIdx: number,
    path: QuizIdxPath,
  ): Promise<QuizResponse> {
    const dbResult = await QuizRepository.getMockQuizForMember(
      memberIdx,
      path.idx,
    )

    return new MockQuizResponse(
      dbResult.type,
      dbResult.title,
      dbResult.description,
      dbResult.singleChoiceChoices,
      dbResult.currentQuizIndex,
      dbResult.totalQuizCount,
    )
  }

  static async submitAnswer(
    memberIdx: number,
    path: QuizIdxPath,
    body: SolveRequest,
  ): Promise<void> {
    const dbResult = await QuizRepository.getMockQuizForMember(memberIdx, path.)

    const type = dbResult.type

    if (type == 'SINGLE_CHOICE') {
      const singleChoiceAnswer = body.singleChoiceAnswer
      if (singleChoiceAnswer == null) {
        throw ErrorRegistry.INVALID_INPUT_FORMAT
      }
      if (dbResult.singleChoiceCorrectAnswer == null) {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }
      if (dbResult.singleChoiceChoices == null) {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }
      if (body.singleChoiceAnswer == null) {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }
    
      const correctAnswer = dbResult.singleChoiceCorrectAnswer
      const score =
        body.singleChoiceAnswer === correctAnswer ? QuizService.MAX_SCORE : 0
  
      const textSubmitAnswer = dbResult.singleChoiceChoices[body.singleChoiceAnswer]
      const textCorrectAnswer = dbResult.singleChoiceChoices[correctAnswer]
  
      await AnswerSubmitRepository.insertAnswerSubmit(
        memberIdx,
        dbResult.idx,
        textSubmitAnswer,
        textCorrectAnswer,
        score,
        QuizService.MAX_SCORE,
      )

      if (dbResult.currentQuizIndex == dbResult.totalQuizCount) {
        await MockScoreRepository.insertScore(memberIdx, dbResult.idx)
      }
    } 
    
    else if (type == 'TEXT') {
      if (body.textAnswer == null) {
        throw ErrorRegistry.INVALID_INPUT_FORMAT
      }
      if(body.textAnswer == null) {
        throw ErrorRegistry.INVALID_INPUT_FORMAT
      }
      if (dbResult.textCorrectAnswer == null) {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }
      if (dbResult.textCorrectAnswer == null) {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }

      const score = (
        await AIAdapter.gradeTextAnswer([body.textAnswer], dbResult.textCorrectAnswer)
      ).score


      await AnswerSubmitRepository.insertAnswerSubmit(
        memberIdx,
        dbResult.idx,
        body.textAnswer,
        dbResult.textCorrectAnswer,
        score,
        QuizService.MAX_SCORE,
      )

      if (dbResult.currentQuizIndex == dbResult.totalQuizCount) {
        await MockScoreRepository.insertScore(memberIdx, dbResult.idx)
      }
    } else {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
  }

  static async getGradingResult(
    memberIdx: number,
    path: QuizIdxPath,
  ): Promise<SolveResponse> {

    const dbResult = await AnswerSubmitRepository.selectAnswerSubmit( memberIdx,
      path.idx)

    return new SolveResponse(
      dbResult.submitAnswer,
      dbResult.correctAnswer,
      dbResult.score,
      dbResult.maxScore,
      dbResult.reason,
      dbResult.currentQuizIndex,
      dbResult.totalQuizCount,
    )
  }
}
