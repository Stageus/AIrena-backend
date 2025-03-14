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
    if (!Regex.TITLE.test(params.title)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title

    if (params.content && !Regex.CONTENT.test(params.content)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.content = params.content

    this.uploadUrls = params.uploadUrls
  }
}
