import AIAdapter from '#adapter/AIAdapter'
import QuizInfo from '#domain/QuizInfo'
import MockWriteRequest from '#dto/request/MockWriteRequest./MockWriteRequest'

export default class MockWriteService {
  static async writeMock(mockWriteRequest: MockWriteRequest) {
    const quizCount = mockWriteRequest.quizCount
    const singleChoiceQuizCount = Math.floor(quizCount * 0.7)
    const textQuizCount = Math.ceil(quizCount * 0.3)

    AIAdapter.getSingleChoiceQuizzes(
      new QuizInfo(
        mockWriteRequest.title,
        mockWriteRequest.content,
        mockWriteRequest.subject,
        singleChoiceQuizCount,
      ),
    )
    AIAdapter.getTextQuizzes(
      new QuizInfo(
        mockWriteRequest.title,
        mockWriteRequest.content,
        mockWriteRequest.subject,
        textQuizCount,
      ),
    )
  }
}
