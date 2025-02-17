import { UUID } from 'crypto'

export default class NoticeDeletePathRequest {
  public idx: UUID
  constructor(idx: UUID) {
    this.idx = idx
  }
}
