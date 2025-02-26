interface NoticeResponseParams {
  title: string
  content: string
  image: string[]
  memberIdx: string
  createdAt: string
}

export default class NoticeResponse {
  public title: string
  public content: string
  public image: string[]
  public memberIdx: string
  public createdAt: string
  constructor(params: NoticeResponseParams) {
    this.title = params.title
    this.content = params.content
    this.image = params.image
    this.memberIdx = params.memberIdx
    this.createdAt = params.createdAt
  }
}
