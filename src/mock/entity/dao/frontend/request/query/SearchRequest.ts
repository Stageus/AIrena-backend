import ErrorRegistry from '#error/ErrorRegistry'

interface SearchQueryParams {
  current: number
  display: number
  sort: 'like'
  title: string
}

export default class SearchQuery {
  current: number
  display: number
  sort: 'new' | 'like'
  title: string

  constructor(params: SearchQueryParams) {
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
