interface ListResponseParams {
  firstPageNumber: number
  currentPageNumber: number
  lastPageNumber: number
  data: any
}

export default class ListResponse {
  public firstPageNumber: number
  public currentPageNumber: number
  public lastPageNumber: number
  public data: any
  constructor(params: ListResponseParams) {
    this.firstPageNumber = params.firstPageNumber
    this.currentPageNumber = params.currentPageNumber
    this.lastPageNumber = params.lastPageNumber
    this.data = params.data
  }
}
