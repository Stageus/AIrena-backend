import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface ListSearchRequestParams {
  title: string
  display: number
  current: number
}

export default class ListSearchRequest {
  public title: string
  public current: number
  public display: number
  constructor(params: ListSearchRequestParams) {
    if (!new RegExp(Regex.TITLE).test(params.title)) {
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
