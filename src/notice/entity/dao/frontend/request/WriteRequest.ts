import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface WriteRequestParams {
  title: string
  content: string
  uploadUrls: string[]
}

export default class WriteRequest {
  public title: string
  public content: string
  public uploadUrls: string[]
  constructor(params: WriteRequestParams) {
    if (
      !new RegExp(Regex.TITLE).test(params.title) ||
      (params.content && params.content.length > 10000)
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title
    this.content = params.content
    this.uploadUrls = params.uploadUrls
  }
}
