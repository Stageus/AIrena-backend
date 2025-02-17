interface ListRequestParams {
  currentPage: number
  offset: number
}

export default class ListRequest {
  public currentPage: number
  public offset: number
  constructor(params: ListRequestParams) {
    this.currentPage = params.currentPage
    this.offset = params.offset
  }
}
