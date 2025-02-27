export default class RankList {
  ranks: {
    rank: number
    nickname: string
    score: number
    tier: number
  }[]

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
