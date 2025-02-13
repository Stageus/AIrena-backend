import MockRepository from 'src/mock/repository/MockRepository.js'
import ListQuery from '../entity/dao/request/query/ListRequest.js'
import ListResponse from '../entity/dao/response/ListResponse.js'

export default class ListService {
  static async getMockList(query: ListQuery): Promise<ListResponse> {
    const currentPageNumber = query.current
    const displayCount = query.display
    const offset = (currentPageNumber - 1) * displayCount

    const dbResult = await MockRepository.getPaginatedMockList(
      displayCount,
      offset,
    )

    const totalCount = dbResult.totalCount

    const firstPageNumber = Math.floor(currentPageNumber / 10) * 10 + 1
    const pageOffset = Math.min(
      9,
      Math.floor(
        (totalCount - (firstPageNumber - 1) * displayCount) / displayCount,
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
}
