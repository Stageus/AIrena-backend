interface NoticeResponseParams {
  title: string
  content: string
  image: string[]
  writerNickname: string
  createdAt: string
}

export default class NoticeResponse {
  public title: string
  public content: string
  public image: string[]
  public writerNickname: string
  public createdAt: string
  constructor(params: NoticeResponseParams) {
    this.title = params.title
    this.content = params.content
    this.image = params.image
    this.writerNickname = params.writerNickname
    this.createdAt = params.createdAt
  }
}
