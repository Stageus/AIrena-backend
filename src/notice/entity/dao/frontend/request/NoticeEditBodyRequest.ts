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
      !new RegExp(Regex.TITLE).test(params.title) ||
      !new RegExp(Regex.CONTENT).test(params.content)
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title
    this.content = params.content
    this.uploadUrls = params.uploadUrls
  }
}
