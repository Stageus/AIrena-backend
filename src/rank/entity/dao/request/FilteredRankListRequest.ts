interface FilteredRankListRequestParams {
  sortType: string
  current: number
}

export default class FilteredRankListRequest {
  public sortType: string
  public current: number
  constructor(params: FilteredRankListRequestParams) {
    this.sortType = params.sortType
    this.current = Number(params.current)
  }
}
