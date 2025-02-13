import AIAdapter from '#adapter/AIAdapter'
import ErrorRegistry from '#error/ErrorRegistry'
import SolveRequest from '../entity/dao/frontend/request/body/SolveRequest.js'
import QuizIdxPath from '../entity/dao/frontend/request/path/QuizIdxPath.js'
import { default as QuizResponse } from '../entity/dao/frontend/response/QuizResponse.js'
import QuizSolveResponse from '../entity/dao/frontend/response/QuizSolveResponse.js'
import AnswerSubmitRepository from '../repository/AnswerSubmitRepository.js'
import QuizRepository from '../repository/QuizRepository.js'

export default class QuizService {
  static MAX_SCORE: number = 100

  static async getQuiz(path: QuizIdxPath): Promise<QuizResponse> {
    const dbResult = await QuizRepository.getQuiz(path.idx)

    if (dbResult == null) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }

    if (dbResult.type == 'SINGLE_CHOICE') {
      if (dbResult.singleChoiceChoices == null) {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }

      return QuizResponse.ofSingleChoice(
        dbResult.title,
        dbResult.description,
        dbResult.singleChoiceChoices,
      )
    }

    if (dbResult.type == 'TEXT') {
      return QuizResponse.ofText(dbResult.title, dbResult.description)
    }

    throw ErrorRegistry.INTERNAL_SERVER_ERROR
  }

  static async submitAnswer(
    memberIdx: number,
    path: QuizIdxPath,
    body: SolveRequest,
  ): Promise<void> {
    const dbResult = await QuizRepository.getQuiz(path.idx)

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

      const textSubmitAnswer =
        dbResult.singleChoiceChoices[body.singleChoiceAnswer]
      const textCorrectAnswer = dbResult.singleChoiceChoices[correctAnswer]

      await AnswerSubmitRepository.insertAnswerSubmit(
        memberIdx,
        dbResult.idx,
        textSubmitAnswer,
        textCorrectAnswer,
        score,
        QuizService.MAX_SCORE,
      )
    } else if (type == 'TEXT') {
      if (body.textAnswer == null) {
        throw ErrorRegistry.INVALID_INPUT_FORMAT
      }
      if (body.textAnswer == null) {
        throw ErrorRegistry.INVALID_INPUT_FORMAT
      }
      if (dbResult.textCorrectAnswer == null) {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }
      if (dbResult.textCorrectAnswer == null) {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }

      const score = (
        await AIAdapter.gradeTextAnswer(
          [body.textAnswer],
          dbResult.textCorrectAnswer,
        )
      ).scores[0]

      await AnswerSubmitRepository.insertAnswerSubmit(
        memberIdx,
        dbResult.idx,
        body.textAnswer,
        dbResult.textCorrectAnswer,
        score,
        QuizService.MAX_SCORE,
      )
    } else {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
  }

  static async getGradingResult(
    memberIdx: number,
    path: QuizIdxPath,
  ): Promise<QuizSolveResponse> {
    const dbResult = await AnswerSubmitRepository.selectAnswerSubmit(
      memberIdx,
      path.idx,
    )

    return new QuizSolveResponse(
      dbResult.submitAnswer,
      dbResult.correctAnswer,
      dbResult.score,
      dbResult.maxScore,
      dbResult.reason,
    )
  }
}
