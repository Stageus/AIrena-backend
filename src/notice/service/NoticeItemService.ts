import ErrorRegistry from '#error/ErrorRegistry'
import NoticeEditBodyRequest from '../entity/dao/frontend/request/NoticeEditBodyRequest.js'
import NoticePathRequest from '../entity/dao/frontend/request/NoticePathRequest.js'
import WriteRequest from '../entity/dao/frontend/request/WriteRequest.js'
import NoticeResponse from '../entity/dao/frontend/response/NoticeResponse.js'
import WriteResponse from '../entity/dao/frontend/response/WriteResponse.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class NoticeItemService {
  static async writeNotice(memberIdx: number, writeRequest: WriteRequest) {
    const { title, content, uploadUrls } = writeRequest
    // 멤버 인덱스

    return new WriteResponse(
      await NoticeRepository.insertNoticeToDb(
        memberIdx,
        title,
        content,
        uploadUrls,
      ),
    )
  }

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
    await NoticeRepository.editNoticeFromDb(idx, title, content, uploadUrls)
  }
}
