import { UUID } from 'crypto'

interface QuizRequestParams {
  idx: UUID
}

export default class QuizRequest {
  public idx: UUID

  constructor(params: QuizRequestParams) {
    this.idx = params.idx
  }
}
