import { UUID } from 'crypto'

interface ArticleIdxPathParams {
  idx: UUID
}

export default class ArticleIdxPath {
  public idx: UUID

  constructor(params: ArticleIdxPathParams) {
    this.idx = params.idx
  }
}
