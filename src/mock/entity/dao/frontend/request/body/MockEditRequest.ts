import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface MockEditRequestParams {
  title: string
  description: string
  uploadUrls: string[]
}

export default class MockEditRequest {
  title: string
  description: string
  uploadUrls: string[]

  constructor(params: MockEditRequestParams) {
    if (
      !Regex.TITLE.test(params.title) ||
      (params.description && params.description.length > 1000)
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title
    this.description = params.description
    this.uploadUrls = params.uploadUrls
  }
}
