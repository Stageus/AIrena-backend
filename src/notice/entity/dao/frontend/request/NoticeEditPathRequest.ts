import { UUID } from 'crypto'

export default class NoticeEditPathRequest {
  public idx: UUID
  constructor(idx: UUID) {
    this.idx = idx
  }
}
