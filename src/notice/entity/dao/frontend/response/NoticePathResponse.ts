interface NoticePathResponseParams {
  title: string
  content: string
  image: string[]
  member_idx: string
  created_at: string
}

export default class NoticePathResponse {
  public title: string
  public content: string
  public image: string[]
  public member_idx: string
  public created_at: string
  constructor(params: NoticePathResponseParams) {
    this.title = params.title
    this.content = params.content
    this.image = params.image
    this.member_idx = params.member_idx
    this.created_at = params.created_at
  }
}
