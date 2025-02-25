import RankList from '../../dto/RankList.js'

export default class FilteredRankListResponse {
  ranks: {
    rank: number
    nickname: string
    score: number
    tier: number
  }[]

  public static of(rankList: RankList): FilteredRankListResponse {
    return new FilteredRankListResponse(rankList.ranks)
  }

  public static createEmpty(): FilteredRankListResponse {
    return new FilteredRankListResponse([])
  }

  constructor(
    ranks: {
      rank: number
      nickname: string
      score: number
      tier: number
    }[],
  ) {
    this.ranks = ranks
  }
}
