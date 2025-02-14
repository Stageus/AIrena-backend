import { UUID } from 'crypto'

interface QuizIdxPathParams {
  idx: UUID
}

export default class QuizIdxPath {
  public idx: UUID

  constructor(params: QuizIdxPathParams) {
    this.idx = params.idx
  }
}
