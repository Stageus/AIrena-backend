import WriteRequest from '../entity/dao/frontend/request/WriteRequest.js'
import WriteResponse from '../entity/dao/frontend/response/WriteResponse.js'
import NoticeRepository from '../repository/NoticeRepository.js'

export default class WriteService {
  static async writeNotice(memberIdx: number, writeRequest: WriteRequest) {
    const { title, content, uploadUrls } = writeRequest

    return new WriteResponse(
      await NoticeRepository.insertNoticeToDb(
        memberIdx,
        title,
        content,
        uploadUrls,
      ),
    )
  }
}
