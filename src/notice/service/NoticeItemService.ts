import ErrorRegistry from '#error/ErrorRegistry'
import NoticeEditBodyRequest from '../entity/dao/frontend/request/NoticeEditBodyRequest.js'
import NoticePathRequest from '../entity/dao/frontend/request/NoticePathRequest.js'
import NoticeResponse from '../entity/dao/frontend/response/NoticeResponse.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class NoticeItemService {
  static async getNotice(noticePathRequest: NoticePathRequest) {
    const { idx } = noticePathRequest
    const result = await NoticeRepository.getNoticeInfoFromDb(idx)
    if (!result) {
      throw ErrorRegistry.CAN_NOT_FIND_NOTICE
    }
    return new NoticeResponse(result)
  }

  static async deleteNotice(noticePathRequest: NoticePathRequest) {
    const { idx } = noticePathRequest
    await NoticeRepository.deleteNoticeFromDb(idx)
  }

  static async editNotice(
    noticePathRequest: NoticePathRequest,
    noticeEditBodyRequest: NoticeEditBodyRequest,
  ) {
    const { idx } = noticePathRequest
    const { title, content, uploadUrls } = noticeEditBodyRequest
    console.log(noticeEditBodyRequest)
    await NoticeRepository.editNoticeFromDb(idx, title, content, uploadUrls)
  }
}
