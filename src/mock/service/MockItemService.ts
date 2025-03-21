import ErrorRegistry from '#error/ErrorRegistry'
import MockEditRequest from '../entity/dao/frontend/request/body/MockEditRequest.js'
import MockIdxPath from '../entity/dao/frontend/request/path/MockIdxPath.js'
import DetailResponse from '../entity/dao/frontend/response/DetailResponse.js'
import IndividualDetailResponse from '../entity/dao/frontend/response/IndividualDetailResponse.js'
import ResultResponse from '../entity/dao/frontend/response/ResultResponse.js'
import MockRepository from '../repository/MockRepository.js'
import MockScoreRepository from '../repository/MockScoreRepository.js'

export default class MockItemService {
  static async getMockDetail(path: MockIdxPath): Promise<DetailResponse> {
    const result = await MockRepository.getMock(path.idx)
    if (!result) {
      throw ErrorRegistry.CAN_NOT_FIND_MOCK
    }

    return new DetailResponse(
      result.title,
      result.description,
      result.createdAt,
      result.quizCount,
      result.writerNickname,
      result.images,
      result.firstQuizIdx,
      result.likeCount,
      result.ranks,
    )
  }

  static async getMockResult(
    userIdx: number,
    path: MockIdxPath,
  ): Promise<ResultResponse> {
    const result = await MockScoreRepository.getScore(userIdx, path.idx)

    return new ResultResponse(
      result.score,
      result.maxScore,
      result.greaterEqualCandidateCount,
      result.totalCandidateCount,
    )
  }

  static async saveMockResult(
    userIdx: number,
    path: MockIdxPath,
  ): Promise<void> {
    await MockScoreRepository.saveScoreForRank(userIdx, path.idx)
    await MockScoreRepository.saveScore(userIdx, path.idx)
  }

  static async getIndividualMockDetail({
    memberIdx,
    path,
  }: {
    memberIdx: number
    path: MockIdxPath
  }): Promise<IndividualDetailResponse> {
    const result = await MockRepository.getIndividualMockDetail(
      memberIdx,
      path.idx,
    )

    return new IndividualDetailResponse(
      result.owner,
      result.admin,
      result.solved,
      result.pushLike,
    )
  }

  static async editMock(
    userIdx: number,
    path: MockIdxPath,
    body: MockEditRequest,
  ): Promise<void> {
    const result = await MockRepository.updateMock(
      userIdx,
      path.idx,
      body.title,
      body.description,
      body.uploadUrls,
    )
    if (result.rowCount === 0) {
      throw ErrorRegistry.MOCK_EDIT_FAILED
    }
  }

  static async deleteMock(userIdx: number, path: MockIdxPath): Promise<void> {
    const result = await MockRepository.deleteMock(userIdx, path.idx)
    if (result.rowCount === 0) {
      throw ErrorRegistry.MOCK_DELETE_FAILED
    }
  }
}
