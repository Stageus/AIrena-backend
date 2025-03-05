import ErrorRegistry from '#error/ErrorRegistry'

interface ListRequestParams {
  current: number
  display: number
}

export default class ListRequest {
  public current: number
  public display: number
  constructor(params: ListRequestParams) {
    if (!params.current) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    } else {
      this.current = Number(params.current)
    }

    if (!params.display) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    } else {
      this.display = Number(params.display)
    }
  }
}
