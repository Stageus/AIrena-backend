import ListQuery from '../entity/dao/frontend/request/query/ListRequest.js'
import SearchQuery from '../entity/dao/frontend/request/query/SearchRequest.js'
import ListResponse from '../entity/dao/frontend/response/ListResponse.js'
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

    const firstPageNumber = Math.floor(currentPageNumber - 1 / 10) * 10 + 1
    const pageOffset = Math.min(
      9,
      Math.floor(
        (dbResult.totalCount - (firstPageNumber - 1) * displayCount) /
          displayCount,
      ),
    )
    const lastPageNumber = firstPageNumber + pageOffset

    return new ListResponse(
      firstPageNumber,
      currentPageNumber,
      lastPageNumber,
      dbResult.mocks,
    )
  }

  static async searchMock(query: SearchQuery): Promise<ListResponse> {
    const currentPageNumber = query.current
    const displayCount = query.display
    const offset = (currentPageNumber - 1) * displayCount
    const title = '%' + query.title + '%'

    if (query.sort === 'new') {
      const dbResult = await MockRepository.getFilteredNewMockList(
        title,
        displayCount,
        offset,
      )

      const firstPageNumber = Math.floor(currentPageNumber / 10) * 10 + 1
      const pageOffset = Math.min(
        9,
        Math.floor(
          (dbResult.totalCount - (firstPageNumber - 1) * displayCount) /
            displayCount,
        ),
      )
      const lastPageNumber = firstPageNumber + pageOffset

      return new ListResponse(
        firstPageNumber,
        currentPageNumber,
        lastPageNumber,
        dbResult.mocks,
      )
    }

    if (query.sort === 'like') {
      const dbResult = await MockRepository.getFilteredLikeDescMockList(
        title,
        displayCount,
        offset,
      )

      const firstPageNumber = Math.floor(currentPageNumber / 10) * 10 + 1
      const pageOffset = Math.min(
        9,
        Math.floor(
          (dbResult.totalCount - (firstPageNumber - 1) * displayCount) /
            displayCount,
        ),
      )
      const lastPageNumber = firstPageNumber + pageOffset

      return new ListResponse(
        firstPageNumber,
        currentPageNumber,
        lastPageNumber,
        dbResult.mocks,
      )
    }

    return ListResponse.createEmpty()
  }
}
