import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'
import { UUID } from 'crypto'

interface NoticePathRequestParams {
  idx: UUID
}

export default class NoticePathRequest {
  public idx: UUID
  constructor(params: NoticePathRequestParams) {
    if (!new RegExp(Regex.UUID).test(params.idx)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.idx = params.idx
  }
}
