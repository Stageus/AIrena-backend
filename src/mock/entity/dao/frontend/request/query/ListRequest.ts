import ErrorRegistry from '#error/ErrorRegistry'

interface ListQueryParams {
  current: number
  display: number
}

export default class ListQuery {
  current: number
  display: number

  constructor(params: ListQueryParams) {
    if (!params.current || !params.display) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.current = Number(params.current)
    this.display = Number(params.display)
  }
}
