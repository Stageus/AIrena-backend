import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'
import { UUID } from 'crypto'

interface QuizRequestParams {
  idx: UUID
}

export default class QuizRequest {
  public idx: UUID

  constructor(params: QuizRequestParams) {
    if (!Regex.UUID.test(params.idx)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.idx = params.idx
  }
}
