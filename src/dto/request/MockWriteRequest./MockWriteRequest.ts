interface MockWriteRequestParams {
  subject: string
  quizCount: number
  title: string
  content: string
  uploadUrls: string[]
}

export default class MockWriteRequest {
  public subject: string
  public quizCount: number
  public title: string
  public content: string
  public uploadUrls: string[]

  constructor(params: MockWriteRequestParams) {
    this.subject = params.subject
    this.quizCount = params.quizCount
    this.title = params.title
    this.content = params.content
    this.uploadUrls = params.uploadUrls
  }
}
