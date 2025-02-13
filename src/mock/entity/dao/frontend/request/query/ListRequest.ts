import ErrorRegistry from '#error/ErrorRegistry'

interface ListQueryParams {
  current: number
  display: number
}

export default class ListQuery {
  current: number
  display: number

  constructor(params: ListQueryParams) {
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
