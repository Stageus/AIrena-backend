import { UUID } from 'crypto'

interface MockIdxPathParams {
  idx: UUID
}

export default class MockIdxPath {
  public idx: UUID

  constructor(params: MockIdxPathParams) {
    this.idx = params.idx
  }
}
