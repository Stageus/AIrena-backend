interface WriteRequestParams {
  title: string
  content: string
}

export default class WriteRequest {
  public title: string
  public content: string
  constructor(params: WriteRequestParams) {
    this.title = params.title
    this.content = params.content
  }
}
