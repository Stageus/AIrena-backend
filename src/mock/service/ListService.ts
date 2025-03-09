import ErrorRegistry from '#error/ErrorRegistry'
import ListRequest from '../entity/dao/frontend/request/query/ListRequest.js'
import ListResponse from '../entity/dao/frontend/response/ListResponse.js'
import MockList from '../entity/dto/MockList.js'
import MockRepository from '../repository/MockRepository.js'

export default class ListService {
  static async getMockList(listRequest: ListRequest): Promise<ListResponse> {
    const { current, display, sort, title } = listRequest
    const offset = (current - 1) * display

    let dbResult
    if (!listRequest.sort && !listRequest.title) {
      dbResult = await MockRepository.getPaginatedMockList(display, offset)
    } else {
      let titleQuery
      if (!title) {
        titleQuery = '%%%'
      } else {
        titleQuery = '%' + title + '%'
      }

      if (!sort) {
        dbResult = await MockRepository.getFilteredLikeDescMockList(
          title,
          display,
          offset,
        )
      } else if (sort === 'new') {
        dbResult = await MockRepository.getFilteredLikeDescMockList(
          title,
          display,
          offset,
        )
      } else if (sort === 'like') {
        dbResult = await MockRepository.getFilteredLikeDescMockList(
          title,
          display,
          offset,
        )
      } else {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }
    }

    const mockList = new MockList(
      current,
      display,
      dbResult.totalCount,
      dbResult.mocks,
    )

    return ListResponse.of(mockList)
  }
}
