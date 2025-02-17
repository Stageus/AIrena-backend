import NoticeDeletePathRequest from '../entity/dao/frontend/request/NoticeDeletePathRequest.js'
import NoticePathRequest from '../entity/dao/frontend/request/NoticePathRequest.js'
import NoticePathResponse from '../entity/dao/frontend/response/NoticePathResponse.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class NoticeItemService {
  static async getNotice(noticePathRequest: NoticePathRequest) {
    const { idx } = noticePathRequest
    return new NoticePathResponse(
      await NoticeRepository.getNoticeInfoFromDb(idx),
    )
  }
  static async deleteNotice(noticeDeletePathRequest: NoticeDeletePathRequest) {
    const { idx } = noticeDeletePathRequest
    await NoticeRepository.deleteNoticeFromDb(idx)
  }
}
