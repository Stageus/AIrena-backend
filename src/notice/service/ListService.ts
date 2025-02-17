import ListResponse from 'src/notice/entity/dao/frontend/response/ListResponse.js'
import ListRequest from '../entity/dao/frontend/request/ListRequest.js'
import ListSearchRequest from '../entity/dao/frontend/request/ListSearchRequest.js'
import ListSearchResponse from '../entity/dao/frontend/response/ListSearchResponse.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class ListService {
  static async getList(listRequest: ListRequest) {
    const { currentPage, offset } = listRequest
    const listData: any = await NoticeRepository.getListFromDb(
      currentPage,
      offset,
    )
    return new ListResponse(listData)
  }

  static async searchList(listSearchRequest: ListSearchRequest) {
    const { title } = listSearchRequest
    const searchData: any = await NoticeRepository.getSearchListFromDb(title)
    return new ListSearchResponse(searchData)
  }
}
