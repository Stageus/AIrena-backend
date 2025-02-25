import ErrorRegistry from '#error/ErrorRegistry'
import NoticeDeletePathRequest from '../entity/dao/frontend/request/NoticeDeletePathRequest.js'
import NoticeEditBodyRequest from '../entity/dao/frontend/request/NoticeEditBodyRequest.js'
import NoticeEditPathRequest from '../entity/dao/frontend/request/NoticeEditPathRequest.js'
import NoticePathRequest from '../entity/dao/frontend/request/NoticePathRequest.js'
import NoticePathResponse from '../entity/dao/frontend/response/NoticePathResponse.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class NoticeItemService {
  static async getNotice(noticePathRequest: NoticePathRequest) {
    const { idx } = noticePathRequest
    const result = await NoticeRepository.getNoticeInfoFromDb(idx)
    if (!result) {
      throw ErrorRegistry.CAN_NOT_FINE_NOTICE
    }
    return new NoticePathResponse(result)
  }
  static async deleteNotice(noticeDeletePathRequest: NoticeDeletePathRequest) {
    const { idx } = noticeDeletePathRequest
    await NoticeRepository.deleteNoticeFromDb(idx)
  }
  static async editNotice(
    noticeEditPathRequest: NoticeEditPathRequest,
    noticeEditBodyRequest: NoticeEditBodyRequest,
  ) {
    const { idx } = noticeEditPathRequest
    const { title, content, uploadUrls } = noticeEditBodyRequest
    await NoticeRepository.editNoticeFromDb(idx, title, content, uploadUrls)
  }
}
