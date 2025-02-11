import MockAdapter from '#adapter/MockAdapter'
import MockDetailRequest from '#dto/frontend/request/MockDetailRequest'
import MockListRequest from '#dto/frontend/request/MockListRequest'
import MockSearchRequest from '#dto/frontend/request/MockSearchRequest'
import MockDetailResponse from '#dto/frontend/response/MockDeatailResponse'
import MockListResponse from '#dto/frontend/response/MockListResponse'

export default class MockGetService {
  static async searchMock(
    request: MockSearchRequest,
  ): Promise<MockListResponse> {
    const currentPageNumber = request.current
    const displayCount = request.display
    const offset = (currentPageNumber - 1) * displayCount
    const title = '%' + request.title + '%'

    if (request.sort === 'new') {
      const result = await MockAdapter.getNewMockFilteredList(
        currentPageNumber,
        displayCount,
        offset,
        title,
      )

      return MockListResponse.of(result)
    }

    if (request.sort === 'like') {
      const result = await MockAdapter.getLikeDescMockFilteredList(
        currentPageNumber,
        displayCount,
        offset,
        title,
      )

      return MockListResponse.of(result)
    }

    return MockListResponse.createEmpty()
  }

  static async getMockList(
    request: MockListRequest,
  ): Promise<MockListResponse> {
    const currentPageNumber = request.current
    const displayCount = request.display
    const offset = (currentPageNumber - 1) * displayCount
    const result = await MockAdapter.getMockList(
      currentPageNumber,
      displayCount,
      offset,
    )

    return MockListResponse.of(result)
  }

  static async getMockDetail(
    request: MockDetailRequest,
  ): Promise<MockDetailResponse> {
    const result = await MockAdapter.getMockDetail(request.idx)
    return MockDetailResponse.of(result)
  }
}
