import { UUID } from 'crypto'
interface NoticeDeletePathRequestParams {
  idx: UUID
}
export default class NoticeDeletePathRequest {
  public idx: UUID
  constructor(params: NoticeDeletePathRequestParams) {
    this.idx = params.idx
  }
}
