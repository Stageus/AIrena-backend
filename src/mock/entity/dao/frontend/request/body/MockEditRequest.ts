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
    if (!Regex.TITLE.test(params.title)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title

    if (params.description && !Regex.DESCRIPTION.test(params.description)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.description = params.description

    this.uploadUrls = params.uploadUrls
  }
}
