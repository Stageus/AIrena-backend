interface NoticeEditBodyRequestParams {
  title: string
  content: string
  image: string[]
}

export default class NoticeEditBodyRequest {
  public title: string
  public content: string
  public image: string[]
  constructor(params: NoticeEditBodyRequestParams) {
    this.title = params.title
    this.content = params.content
    this.image = params.image
  }
}
