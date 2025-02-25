interface RankListRequestParams {
  sortType: string
  nicknameToSearch: string
  rangeToGet: string
}

export default class RankListRequest {
  public sortType: string
  public nicknameToSearch: string
  public rangeToGet: string
  constructor(params: RankListRequestParams) {
    this.sortType = params.sortType
    this.nicknameToSearch = params.nicknameToSearch
    this.rangeToGet = params.rangeToGet
  }
}
