import MockAdapter from '#adapter/MockAdapter'
import MockSearchRequest from '#dto/frontend/request/MockSearchRequest'
import {
  default as MockListGetResponse,
  default as MockSearchResponse,
} from '#dto/frontend/response/MockSearchResponse'

export default class MockInfoService {
  static async getMockList(
    request: MockSearchRequest,
  ): Promise<MockSearchResponse> {
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

      return MockSearchResponse.of(result)
    }

    if (request.sort === 'like') {
      const result = await MockAdapter.getLikeDescMockFilteredList(
        currentPageNumber,
        displayCount,
        offset,
        title,
      )

      return MockSearchResponse.of(result)
    }

    return MockListGetResponse.createEmpty()
  }
}
