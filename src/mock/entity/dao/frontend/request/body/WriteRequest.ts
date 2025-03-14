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
    if (!Regex.SUBJECT.test(params.subject)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.subject = params.subject

    if (!Regex.TITLE.test(params.title)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title

    if (params.description && !Regex.DESCRIPTION.test(params.description)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.description = params.description

    if (params.quizCount > 10 || params.quizCount < 1) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.quizCount = params.quizCount

    this.uploadUrls = params.uploadUrls
  }
}
