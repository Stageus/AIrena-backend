import ErrorRegistry from '#error/ErrorRegistry'

interface NoticeEditBodyRequestParams {
  title: string
  content: string
  existingUrls: string[]
  uploadUrls: string[]
}

export default class NoticeEditBodyRequest {
  public title: string
  public content: string
  public uploadUrls: string[]
  constructor(params: NoticeEditBodyRequestParams) {
    if (!params.title) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.title.length > 50 && params.title.length < 2) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.content && params.content.length > 1000) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title
    this.content = params.content
    this.uploadUrls = params.uploadUrls
  }
}
