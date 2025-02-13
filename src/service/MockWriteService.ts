import ImageAdapter from '#adapter/ImageAdapter'
import MockAdapter from '#adapter/MockAdapter'
import MockWriteRequest from '#dto/frontend/request/MockWriteRequest'
import MockWriteResponse from '#dto/frontend/response/MockWriteResponse'
import Image from '#entity/Image'
import Mock from '#entity/Mock'

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
      quizzes,
    )

    const image = new Image(mock.idx, mockWriteRequest.uploadUrls)

    await ImageAdapter.insertImage(image)
    await MockAdapter.insertMockData(memberIdx, mock)

    return new MockWriteResponse(mock.idx)
  }
}
