import ListRequest from '../entity/dao/frontend/request/ListRequest.js'
import ListSearchRequest from '../entity/dao/frontend/request/ListSearchRequest.js'
import ListResponse from '../entity/dao/frontend/response/ListResponse.js'
import ListSearchResponse from '../entity/dao/frontend/response/ListSearchResponse.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class ListService {
  static async getList(listRequest: ListRequest) {
    const { current, display } = listRequest
    const offset = (current - 1) * display
    const listData: any = await NoticeRepository.getPagedListFromDb(
      display,
      offset,
    )
    let firstPageNumber = Math.floor(current / 10) * 10 + 1
    const totalCount = parseInt(listData.totalCountResult.totalcount, 10)
    const pageOffset = Math.min(
      9,
      Math.floor((totalCount - (firstPageNumber - 1) * display) / display),
    )
    const lastPageNumber = firstPageNumber + pageOffset
    return new ListResponse(
      firstPageNumber,
      current,
      lastPageNumber,
      listData.listResult,
    )
  }

  static async searchList(listSearchRequest: ListSearchRequest) {
    const { title, display, current } = listSearchRequest
    const offset = (current - 1) * display
    const searchData: any = await NoticeRepository.getSearchListFromDb(
      title,
      display,
      offset,
    )
    let firstPageNumber = Math.floor(current / 10) * 10 + 1
    const totalCount = parseInt(searchData.totalCountResult.totalcount, 10)
    const pageOffset = Math.min(
      9,
      Math.floor((totalCount - (firstPageNumber - 1) * display) / display),
    )
    const lastPageNumber = firstPageNumber + pageOffset
    return new ListSearchResponse(
      firstPageNumber,
      current,
      lastPageNumber,
      searchData.listResult,
    )
  }
}
