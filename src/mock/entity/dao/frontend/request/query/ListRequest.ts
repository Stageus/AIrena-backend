import ErrorRegistry from '#error/ErrorRegistry'

interface ListRequestParams {
  current: number
  display: number
  sort: 'like'
  title: string
}

export default class ListRequest {
  current: number
  display: number
  sort: 'new' | 'like'
  title: string

  constructor(params: ListRequestParams) {
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

    this.sort = params.sort

    if (params.title && params.title.length > 100) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.title = params.title
  }
}
