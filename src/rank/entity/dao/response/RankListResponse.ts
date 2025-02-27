import RankList from '../../dto/RankList.js'

export default class RankListResponse {
  ranks: {
    rank: number
    nickname: string
    score: number
    tier: number
  }[]

  public static of(rankList: RankList): RankListResponse {
    return new RankListResponse(rankList.ranks)
  }

  public static createEmpty(): RankListResponse {
    return new RankListResponse([])
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
