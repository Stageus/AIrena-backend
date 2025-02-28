import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'
import { UUID } from 'crypto'

interface ArticleIdxPathParams {
  idx: UUID
}

export default class ArticleIdxPath {
  public idx: UUID

  constructor(params: ArticleIdxPathParams) {
    if (!new RegExp(Regex.uuid).test(params.idx)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.idx = params.idx
  }
}
