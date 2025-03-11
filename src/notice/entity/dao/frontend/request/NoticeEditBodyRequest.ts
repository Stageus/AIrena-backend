import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface NoticeEditBodyRequestParams {
  title: string
  content: string
  uploadUrls: string[]
}

export default class NoticeEditBodyRequest {
  public title: string
  public content: string
  public uploadUrls: string[]
  constructor(params: NoticeEditBodyRequestParams) {
    if (
      !Regex.TITLE.test(params.title) ||
      (params.content && params.content.length > 1000)
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title
    this.content = params.content
    this.uploadUrls = params.uploadUrls
  }
}
