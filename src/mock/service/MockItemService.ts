import MockIdxPath from '../entity/dao/frontend/request/path/MockIdxPath.js'
import DetailResponse from '../entity/dao/frontend/response/DetailResponse.js'
import IndividualMockInfoResponse from '../entity/dao/frontend/response/IndividualMockInfoResponse.js'
import ResultResponse from '../entity/dao/frontend/response/ResultResponse.js'
import MockRepository from '../repository/MockRepository.js'
import MockScoreRepository from '../repository/MockScoreRepository.js'

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
      result.firstQuizIdx,
    )
  }

  static async getMockResult(
    userIdx: number,
    path: MockIdxPath,
  ): Promise<ResultResponse> {
    const result = await MockScoreRepository.getScore(userIdx, path.idx)

    const topPercentile =
      (result.greaterEqualCandidateCount / result.totalCandidateCount) * 100
    return new ResultResponse(result.score, result.maxScore, topPercentile)
  }

  static async saveMockResult(
    userIdx: number,
    path: MockIdxPath,
  ): Promise<void> {
    await MockScoreRepository.saveScoreForRank(userIdx, path.idx)
    await MockScoreRepository.saveScore(userIdx, path.idx)
  }

  static async getIndividualMockInfo(
    memberIdx: number,
    path: MockIdxPath,
  ): Promise<IndividualMockInfoResponse> {
    const result = await MockRepository.getIndividualMockInfo(
      memberIdx,
      path.idx,
    )

    return new IndividualMockInfoResponse(
      result.owner,
      result.solved,
      result.pushLike,
    )
  }
}
