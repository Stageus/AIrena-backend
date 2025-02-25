interface ListRequestParams {
  current: number
  display: number
}

export default class ListRequest {
  public current: number
  public display: number
  constructor(params: ListRequestParams) {
    this.current = params.current
    this.display = params.display
  }
}
