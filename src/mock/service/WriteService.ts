import AIAdapter from '#adapter/AIAdapter'
import WriteRequest from '../entity/dao/frontend/request/body/WriteRequest.js'
import WriteResponse from '../entity/dao/frontend/response/WriteResponse.js'
import Quiz from '../entity/dto/Quiz.js'
import MockRepository from '../repository/MockRepository.js'

export default class WriteService {
  static async writeMock(memberIdx: number, body: WriteRequest) {
    const quizCount = body.quizCount
    const singleChoiceQuizCount = Math.floor(quizCount * 0.8)
    const textQuizCount = Math.ceil(quizCount * 0.2)

    const generatedQuizzes = await Promise.all([
      AIAdapter.getSingleChoiceQuizzes(
        body.title,
        body.description,
        body.subject,
        singleChoiceQuizCount,
      ),
      AIAdapter.getTextQuizzes(
        body.title,
        body.description,
        body.subject,
        textQuizCount,
      ),
    ])

    const singleChoiceQuizzes = generatedQuizzes[0].quizzes.map((quiz) =>
      Quiz.toSingleChoiceQuiz(
        quiz.title,
        quiz.description,
        quiz.choices,
        quiz.correctChoice,
        quiz.reason,
      ),
    )

    const textQuizzes = generatedQuizzes[1].quizzes.map((quiz) =>
      Quiz.toTextQuiz(
        quiz.title,
        quiz.description,
        quiz.correctAnswer,
        quiz.reason,
      ),
    )

    const quizzes = [...singleChoiceQuizzes, ...textQuizzes]

    const mockIdx = await MockRepository.insertMockData(
      memberIdx,
      body.title,
      body.description,
      body.quizCount,
      quizzes,
      body.uploadUrls,
    )

    return new WriteResponse(mockIdx)
  }
}
