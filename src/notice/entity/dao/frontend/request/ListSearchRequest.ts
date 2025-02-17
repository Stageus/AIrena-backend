interface ListSearchRequestParams {
  title: string
}

export default class ListSearchRequest {
  public title: string
  constructor(params: ListSearchRequestParams) {
    this.title = params.title
  }
}
