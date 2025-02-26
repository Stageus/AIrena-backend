interface RankListRequestParams {
  sortType: string
  nicknameToSearch: string
}

export default class RankListRequest {
  public sortType: string
  public nicknameToSearch: string
  constructor(params: RankListRequestParams) {
    this.sortType = params.sortType
    this.nicknameToSearch = params.nicknameToSearch
  }
}
