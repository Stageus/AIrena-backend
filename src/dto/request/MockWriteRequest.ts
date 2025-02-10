interface MockWriteRequestParams {
  subject: string
  quizCount: number
  title: string
  description: string
  uploadUrls: string[]
}

export default class MockWriteRequest {
  public subject: string
  public quizCount: number
  public title: string
  public description: string
  public uploadUrls: string[]

  constructor(params: MockWriteRequestParams) {
    this.subject = params.subject
    this.quizCount = params.quizCount
    this.title = params.title
    this.description = params.description
    this.uploadUrls = params.uploadUrls
  }
}
