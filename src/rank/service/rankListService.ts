import RankListRequest from '../entity/dao/request/RankListRequest.js'
import RankListResponse from '../entity/dao/response/RankListResponse.js'
import RankListRepository from '../repository/rankListRepository.js'

export default class RankListService {
  static async getRankList(rankListRequest: RankListRequest) {
    const { current, tier, nickname } = rankListRequest

    let result
    if (!tier && !nickname) {
      result = await RankListRepository.getRankListFromDb(current)
    } else {
      let tierQuery: string
      if (!tier) {
        tierQuery = '%'
      } else {
        tierQuery = tier
      }

      let nicknameQuery: string
      if (!nickname) {
        nicknameQuery = '%'
      } else {
        nicknameQuery = nickname
      }

      result = await RankListRepository.getFilteredRankListFromDb(
        tierQuery,
        current,
        nicknameQuery,
      )
    }

    return new RankListResponse(result)
  }
}
