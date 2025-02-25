interface WriteRequestParams {
  title: string
  content: string
  uploadUrls: string[]
}

export default class WriteRequest {
  public title: string
  public content: string
  public uploadUrls: string[]
  constructor(params: WriteRequestParams) {
    this.title = params.title
    this.content = params.content
    this.uploadUrls = params.uploadUrls
  }
}
