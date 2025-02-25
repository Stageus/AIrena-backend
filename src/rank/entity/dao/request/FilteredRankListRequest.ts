interface FilteredRankListRequestParams {
  nicknameToSearch: string
}

export default class FilteredRankListRequest {
  public nicknameToSearch: string
  constructor(params: FilteredRankListRequestParams) {
    this.nicknameToSearch = params.nicknameToSearch
  }
}
