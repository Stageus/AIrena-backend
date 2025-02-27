interface ListSearchRequestParams {
  title: string
  display: number
  current: number
}

export default class ListSearchRequest {
  public title: string
  public current: number
  public display: number
  constructor(params: ListSearchRequestParams) {
    this.title = params.title
    this.display = Number(params.display)
    this.current = Number(params.current)
  }
}
