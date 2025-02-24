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
  constructor(
    firstPageNumber: number,
    currentPageNumber: number,
    lastPageNumber: number,
    params: ListResponseParams,
  ) {
    this.firstPageNumber = firstPageNumber
    this.currentPageNumber = currentPageNumber
    this.lastPageNumber = lastPageNumber
    this.data = params.data
  }
}
