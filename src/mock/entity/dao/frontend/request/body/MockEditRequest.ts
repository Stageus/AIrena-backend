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
      !new RegExp(Regex.TITLE).test(params.title) ||
      !new RegExp(Regex.DESCRIPTION).test(params.description)
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title
    this.description = params.description
    this.uploadUrls = params.uploadUrls
  }
}
