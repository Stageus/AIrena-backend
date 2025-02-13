import MockRepository from 'src/mock/repository/MockRepository.js'
import MockIdxPath from '../entity/dao/request/path/MockIdxPath.js'
import DetailResponse from '../entity/dao/response/DetailResponse.js'

export default class MockItemService {
  static async getMockDetail(path: MockIdxPath): Promise<DetailResponse> {
    const result = await MockRepository.getMock(path.idx)

    return new DetailResponse(
      result.title,
      result.description,
      result.createdAt,
      result.quizCount,
      result.writerNickname,
      result.images,
    )
  }
}
