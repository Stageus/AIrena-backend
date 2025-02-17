import { UUID } from 'crypto'

export default class NoticePathRequest {
  public idx: UUID
  constructor(idx: UUID) {
    this.idx = idx
  }
}
