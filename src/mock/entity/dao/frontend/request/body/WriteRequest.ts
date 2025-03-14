import ErrorRegistry from '#error/ErrorRegistry'

interface WriteRequestParams {
  subject: string
  quizCount: number
  title: string
  description: string
  uploadUrls: string[]
}

export default class WriteRequest {
  public subject: string
  public quizCount: number
  public title: string
  public description: string
  public uploadUrls: string[]

  constructor(params: WriteRequestParams) {
    if (!params.subject) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.subject.length > 50 || params.subject.length < 2) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.subject = params.subject

    if (!params.title) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.title.length > 50 || params.title.length < 2) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title

    if (!params.description) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.description.length > 1000) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.description = params.description

    if (params.quizCount > 10 || params.quizCount < 0) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.quizCount = params.quizCount

    this.uploadUrls = params.uploadUrls
  }
}
