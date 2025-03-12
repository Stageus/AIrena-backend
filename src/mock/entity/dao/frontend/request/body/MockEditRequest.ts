import ErrorRegistry from '#error/ErrorRegistry'

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
    if (!params.title) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.title.length > 50 && params.title.length < 2) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.description && params.description.length > 1000) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title
    this.description = params.description
    this.uploadUrls = params.uploadUrls
  }
}
