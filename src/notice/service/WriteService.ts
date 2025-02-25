import WriteRequest from '../entity/dao/frontend/request/WriteRequest.js'
import WriteResponse from '../entity/dao/frontend/response/WriteResponse.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class WriteService {
  static async writeNotice(writeRequest: WriteRequest) {
    const { title, content, uploadUrls } = writeRequest
    // 멤버 인덱스

    return new WriteResponse(
      await NoticeRepository.insertNoticeToDb(2, title, content, uploadUrls),
    )
  }
}
