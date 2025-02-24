interface MockEditRequestParams {
  title: string
  description: string
  urls: string[]
}

export default class MockEditRequest {
  title: string
  description: string
  urls: string[]

  constructor(public params: MockEditRequestParams) {
    this.title = params.title
    this.description = params.description
    this.urls = params.urls
  }
}
