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
    this.title = params.title
    this.description = params.description
    this.uploadUrls = params.uploadUrls
  }
}
