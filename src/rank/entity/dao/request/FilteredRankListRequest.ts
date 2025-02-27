interface FilteredRankListRequestParams {
  tier: string
  current: number
  nickname: string
}

export default class FilteredRankListRequest {
  public tier: string
  public current: number
  public nickname: string
  constructor(params: FilteredRankListRequestParams) {
    this.tier = params.tier
    this.current = Number(params.current)
    this.nickname = params.nickname
  }
}
