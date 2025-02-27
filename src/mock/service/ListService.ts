import ErrorRegistry from '#error/ErrorRegistry'
import ListQuery from '../entity/dao/frontend/request/query/ListRequest.js'
import SearchQuery from '../entity/dao/frontend/request/query/SearchRequest.js'
import ListResponse from '../entity/dao/frontend/response/ListResponse.js'
import MockList from '../entity/dto/MockList.js'
import MockRepository from '../repository/MockRepository.js'

export default class ListService {
  static async getMockList(query: ListQuery): Promise<ListResponse> {
    const currentPageNumber = query.current
    const displayCount = query.display
    const offset = (currentPageNumber - 1) * displayCount

    const dbResult = await MockRepository.getPaginatedMockList(
      displayCount,
      offset,
    )

    const mockList = new MockList(
      currentPageNumber,
      displayCount,
      dbResult.totalCount,
      dbResult.mocks,
    )

    return ListResponse.of(mockList)
  }

  static async searchMock(query: SearchQuery): Promise<ListResponse> {
    const currentPageNumber = query.current
    const displayCount = query.display
    const offset = (currentPageNumber - 1) * displayCount
    const title = '%' + query.title + '%'

    const dbResult = await this.getDBResultBySortType(
      query.sort,
      title,
      displayCount,
      offset,
    )

    const mockList = new MockList(
      currentPageNumber,
      displayCount,
      dbResult.totalCount,
      dbResult.mocks,
    )
    return ListResponse.of(mockList)
  }

  private static getDBResultBySortType = (
    sortType: 'new' | 'like',
    title: string,
    displayCount: number,
    offset: number,
  ) => {
    if (sortType === 'new') {
      return MockRepository.getFilteredNewMockList(title, displayCount, offset)
    }
    if (sortType === 'like') {
      return MockRepository.getFilteredLikeDescMockList(
        title,
        displayCount,
        offset,
      )
    }
    throw ErrorRegistry.INTERNAL_SERVER_ERROR
  }
}
