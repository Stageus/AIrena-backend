import { UUID } from 'crypto'
interface NoticeEditPathRequestParams {
  idx: UUID
}

export default class NoticeEditPathRequest {
  public idx: UUID
  constructor(params: NoticeEditPathRequestParams) {
    this.idx = params.idx
  }
}
