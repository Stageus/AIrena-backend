import ErrorRegistry from '#error/ErrorRegistry'

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
    if (!params.title) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.title.length > 50 && params.title.length < 2) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title

    if (!params.content) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.content.length > 10000) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.content = params.content

    this.uploadUrls = params.uploadUrls
  }
}
