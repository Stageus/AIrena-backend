import { UUID } from 'crypto'

export default class WriteResponse {
  public articleId: UUID

  constructor(articleId: UUID) {
    this.articleId = articleId
  }
}
