import ErrorRegistry from '#error/ErrorRegistry'

interface MockListRequestParams {
  current: number
  display: number
}

export default class MockListRequest {
  current: number
  display: number

  constructor(params: MockListRequestParams) {
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
  }
}
