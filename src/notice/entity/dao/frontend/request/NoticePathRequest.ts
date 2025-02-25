import { UUID } from 'crypto'

interface NoticePathRequestParams {
  idx: UUID
}

export default class NoticePathRequest {
  public idx: UUID
  constructor(params: NoticePathRequestParams) {
    this.idx = params.idx
  }
}
