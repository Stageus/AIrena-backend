import { UUID } from 'crypto'

interface MockQuizRequestParams {
  idx: UUID
}

export default class MockQuizRequest {
  public idx: UUID

  constructor(params: MockQuizRequestParams) {
    this.idx = params.idx
  }
}
