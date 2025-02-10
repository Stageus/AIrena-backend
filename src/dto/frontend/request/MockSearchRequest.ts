import ErrorRegistry from '#core/error/errorRegistry'

interface MockSearchRequestParams {
  current: number
  display: number
  sort: 'new' | 'like'
  title: string
}

export default class MockSearchRequest {
  current: number
  display: number
  sort: 'new' | 'like'
  title: string

  constructor(params: MockSearchRequestParams) {
    if (!params.current) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    } else {
      this.current = Number(params.current)
    }

    if (!params.display) {
      this.display = 10
    } else {
      this.display = Number(params.display)
    }

    if (!params.sort) {
      this.sort = 'new'
    } else {
      this.sort = params.sort
    }

    if (!params.title) {
      this.title = '%'
    } else {
      this.title = params.title
    }
  }
}
