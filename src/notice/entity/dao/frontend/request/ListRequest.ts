interface ListRequestParams {
  current: number
  display: number
}

export default class ListRequest {
  public current: number
  public display: number
  constructor(params: ListRequestParams) {
    this.current = Number(params.current)
    this.display = Number(params.display)
  }
}
