import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'
import { UUID } from 'crypto'

interface MockIdxPathParams {
  idx: UUID
}

export default class MockIdxPath {
  public idx: UUID

  constructor(params: MockIdxPathParams) {
    if (!new RegExp(Regex.uuid).test(params.idx)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.idx = params.idx
  }
}
