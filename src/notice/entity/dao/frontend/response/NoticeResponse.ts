interface NoticeResponseParams {
  title: string
  content: string
  images: string[]
  writerNickname: string
  createdAt: string
}

export default class NoticeResponse {
  public title: string
  public content: string
  public images: string[]
  public writerNickname: string
  public createdAt: string
  constructor(params: NoticeResponseParams) {
    this.title = params.title
    this.content = params.content
    this.images = params.images
    this.writerNickname = params.writerNickname
    this.createdAt = params.createdAt
  }
}
