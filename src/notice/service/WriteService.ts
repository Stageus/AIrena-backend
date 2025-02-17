import WriteRequest from '../entity/dao/frontend/request/WriteRequest.js'
import WriteResponse from '../entity/dao/frontend/response/WriteResponse.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class WriteService {
  static async writeNotice(writeRequest: WriteRequest) {
    const { title, content, image } = writeRequest
    // 멤버 인덱스
    const memberIdx = 2
    return new WriteResponse(
      await NoticeRepository.insertNoticeToDb(memberIdx, title, content, image),
    )
  }
}
