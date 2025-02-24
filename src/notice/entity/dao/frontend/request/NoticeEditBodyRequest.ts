interface NoticeEditBodyRequestParams {
  title: string
  content: string
  uploadUrls: string[]
}

export default class NoticeEditBodyRequest {
  public title: string
  public content: string
  public uploadUrls: string[]
  constructor(params: NoticeEditBodyRequestParams) {
    this.title = params.title
    this.content = params.content
    this.uploadUrls = params.uploadUrls
  }
}
