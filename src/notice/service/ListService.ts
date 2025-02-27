import ListRequest from '../entity/dao/frontend/request/ListRequest.js'
import ListSearchRequest from '../entity/dao/frontend/request/ListSearchRequest.js'
import ListResponse from '../entity/dao/frontend/response/ListResponse.js'
import ListSearchResponse from '../entity/dao/frontend/response/ListSearchResponse.js'
import NoticeList from '../entity/dto/NoticeList.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class ListService {
  static async getList(listRequest: ListRequest) {
    const { current, display } = listRequest
    const offset = (current - 1) * display
    const listData: any = await NoticeRepository.getPagedListFromDb(
      display,
      offset,
    )

    const noticeList = new NoticeList(
      current,
      display,
      listData.totalCountResult.totalCount,
      listData.listResult,
    )

    return ListResponse.of(noticeList)
  }

  static async searchList(listSearchRequest: ListSearchRequest) {
    const { title, display, current } = listSearchRequest
    const offset = (current - 1) * display
    const titleToSearch = '%' + title + '%'
    const searchData: any = await NoticeRepository.getSearchListFromDb(
      titleToSearch,
      display,
      offset,
    )
    const noticeList = new NoticeList(
      current,
      display,
      searchData.totalCountResult.totalCount,
      searchData.listResult,
    )
    return ListSearchResponse.of(noticeList)
  }
}
