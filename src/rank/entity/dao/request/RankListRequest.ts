interface RankListRequestParams {
  sortType: string
  nicknameToSearch: string
  display: number
}

export default class RankListRequest {
  public sortType: string
  public nicknameToSearch: string
  public display: number
  constructor(params: RankListRequestParams) {
    this.sortType = params.sortType
    this.nicknameToSearch = params.nicknameToSearch
    this.display = Number(params.display)
  }
}
