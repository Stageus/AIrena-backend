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
    if (
      !new RegExp(Regex.SUBJECT).test(params.subject) ||
      !new RegExp(Regex.TITLE).test(params.title) ||
      !new RegExp(Regex.DESCRIPTION).test(params.description) ||
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
