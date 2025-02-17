interface WriteRequestParams {
  title: string
  content: string
  image: string[]
}

export default class WriteRequest {
  public title: string
  public content: string
  public image: string[]
  constructor(params: WriteRequestParams) {
    this.title = params.title
    this.content = params.content
    this.image = params.image
  }
}
