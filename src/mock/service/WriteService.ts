import MockWriteResponse from '#dto/frontend/response/MockWriteResponse'
import AIAdapter from 'src/core/adapter/AIAdapter.js'
import WriteRequest from '../entity/dao/request/body/WriteRequest.js'
import Quiz from '../entity/dto/Quiz.js'
import MockRepository from '../repository/MockRepository.js'

export default class WriteService {
  static async writeMock(memberIdx: number, body: WriteRequest) {
    const quizzes = await getQuizzes(body)

    const mockIdx = await MockRepository.insertMockData(
      memberIdx,
      body.title,
      body.description,
      body.quizCount,
      quizzes,
    )
    await ImageRepository.insertImage(mockIdx, body.uploadUrls)

    return new MockWriteResponse(mockIdx)
  }
}

const getQuizzes = async (body: WriteRequest) => {
  const quizCount = body.quizCount
  const singleChoiceQuizCount = Math.floor(quizCount * 0.7)
  const textQuizCount = Math.ceil(quizCount * 0.3)

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

  return [...singleChoiceQuizzes, ...textQuizzes]
}
