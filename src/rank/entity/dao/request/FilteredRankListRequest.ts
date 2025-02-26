interface FilteredRankListRequestParams {
  sortType: string
}

export default class FilteredRankListRequest {
  public sortType: string
  constructor(params: FilteredRankListRequestParams) {
    this.sortType = params.sortType
  }
}
