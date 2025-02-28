import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'
import { UUID } from 'crypto'

interface QuizIdxPathParams {
  idx: UUID
}

export default class QuizIdxPath {
  public idx: UUID

  constructor(params: QuizIdxPathParams) {
    if (!new RegExp(Regex.uuid).test(params.idx)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.idx = params.idx
  }
}
