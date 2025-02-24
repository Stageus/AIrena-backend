import ListRequest from '../entity/dao/frontend/request/ListRequest.js'
import ListSearchRequest from '../entity/dao/frontend/request/ListSearchRequest.js'
import ListResponse from '../entity/dao/frontend/response/ListResponse.js'
import ListSearchResponse from '../entity/dao/frontend/response/ListSearchResponse.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class ListService {
  static async getList(listRequest: ListRequest) {
    const { current, display } = listRequest
    const listData: any = await NoticeRepository.getListFromDb(current, display)
    return new ListResponse(1, current, 2, listData)
  }

  static async searchList(listSearchRequest: ListSearchRequest) {
    const { title } = listSearchRequest
    const searchData: any = await NoticeRepository.getSearchListFromDb(title)
    return new ListSearchResponse(searchData)
  }
}
