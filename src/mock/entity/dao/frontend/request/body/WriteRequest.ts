import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

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
    if (!params.title) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.title.length > 50 && params.title.length < 2) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (
      !Regex.SUBJECT.test(params.subject) ||
      (params.description && params.description.length > 1000) ||
      params.quizCount > 10 ||
      params.quizCount < 0
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.subject = params.subject
    this.quizCount = params.quizCount
    this.title = params.title
    this.description = params.description
    this.uploadUrls = params.uploadUrls
  }
}
