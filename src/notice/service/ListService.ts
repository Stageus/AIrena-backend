import ListRequest from '../entity/dao/frontend/request/ListRequest.js'
import ListResponse from '../entity/dao/frontend/response/ListResponse.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class ListService {
  static async getList(listRequest: ListRequest) {
    const { current, display, title } = listRequest
    const offset = (current - 1) * display

    let listData
    if (!title) {
      listData = await NoticeRepository.getPagedListFromDb(display, offset)
    } else {
      const titleQuery = '%' + title + '%'
      listData = await NoticeRepository.getSearchListFromDb(
        titleQuery,
        display,
        offset,
      )
    }

    return new ListResponse(
      current,
      display,
      listData.totalCount,
      listData.list,
    )
  }
}
