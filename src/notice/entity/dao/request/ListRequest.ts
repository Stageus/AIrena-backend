interface NoticeRequestParams {
  currentPage: number
  offset: number
}

export default class NoticeRequest {
  public currentPage: number
  public offset: number
  constructor(params: NoticeRequestParams) {
    this.currentPage = params.currentPage
    this.offset = params.offset
  }
}
