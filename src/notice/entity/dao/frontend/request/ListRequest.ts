import ErrorRegistry from '#error/ErrorRegistry'

interface ListRequestParams {
  title: string
  display: number
  current: number
}

export default class ListRequest {
  public title: string
  public current: number
  public display: number
  constructor(params: ListRequestParams) {
    if (params.title && params.title.length > 100) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title

    if (!params.current) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.display = Number(params.display)

    if (!params.display) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.current = Number(params.current)
  }
}
