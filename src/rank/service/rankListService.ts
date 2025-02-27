import FilteredRankListRequest from '../entity/dao/request/FilteredRankListRequest.js'
import RankListRequest from '../entity/dao/request/RankListRequest.js'
import FilteredRankListResponse from '../entity/dao/response/FilteredRankListResponse.js'
import RankListResponse from '../entity/dao/response/RankListResponse.js'
import RankListRepository from '../repository/rankListRepository.js'

export default class RankListService {
  static async getRankList(rankListRequest: RankListRequest) {
    const { current } = rankListRequest
    const result: any = await RankListRepository.getRankListFromDb(current)
    return new RankListResponse(result)
  }
  static async getFilteredRankList(
    filteredRankListRequest: FilteredRankListRequest,
  ) {
    const { sortType, current } = filteredRankListRequest
    const result: any = await RankListRepository.getFilteredRankListFromDb(
      sortType,
      current,
    )
    return new FilteredRankListResponse(result)
  }
}
