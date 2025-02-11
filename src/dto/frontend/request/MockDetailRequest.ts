import { UUID } from 'crypto'

interface MockDetailRequestParams {
  idx: UUID
}

export default class MockDetailRequest {
  public idx: UUID

  constructor(params: MockDetailRequestParams) {
    this.idx = params.idx
  }
}
