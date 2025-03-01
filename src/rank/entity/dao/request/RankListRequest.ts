interface RankListRequestParams {
  current: number
}

export default class RankListRequest {
  public current: number
  constructor(params: RankListRequestParams) {
    this.current = Number(params.current)
  }
}
;``
