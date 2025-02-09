import AIAdapter from '#adapter/AIAdapter'
import ImageAdapter from '#adapter/ImageAdapter'
import MockAdapter from '#adapter/MockAdapter'
import MockWriteRequest from '#dto/request/MockWriteRequest/MockWriteRequest'
import MockWriteResponse from '#dto/response/MockWriteResponse'
import Image from '#entity/Image'
import Mock from '#entity/Mock'
import QuizInfo from '#entity/QuizInfo'

export default class MockWriteService {
  static async writeMock(
    memberIdx: number,
    mockWriteRequest: MockWriteRequest,
  ) {
    const quizzes = await getQuizzes(mockWriteRequest)

    const mock = new Mock(
      memberIdx,
      mockWriteRequest.title,
      mockWriteRequest.description,
      quizzes.length,
    )

    const image = new Image(mock.idx, mockWriteRequest.uploadUrls)

    await ImageAdapter.insertImage(image)
    await MockAdapter.insertMockData(memberIdx, mock, quizzes)

    return new MockWriteResponse(mock.idx)
  }
}

const getQuizzes = async (mockWriteRequest: MockWriteRequest) => {
  const quizCount = mockWriteRequest.quizCount
  const singleChoiceQuizCount = Math.floor(quizCount * 0.7)
  const textQuizCount = Math.ceil(quizCount * 0.3)

  const generatedQuizzes = await Promise.all([
    AIAdapter.getSingleChoiceQuizzes(
      new QuizInfo(
        mockWriteRequest.title,
        mockWriteRequest.description,
        mockWriteRequest.subject,
        singleChoiceQuizCount,
      ),
    ),
    AIAdapter.getTextQuizzes(
      new QuizInfo(
        mockWriteRequest.title,
        mockWriteRequest.description,
        mockWriteRequest.subject,
        textQuizCount,
      ),
    ),
  ])

  return [...generatedQuizzes[0], ...generatedQuizzes[1]]
}
