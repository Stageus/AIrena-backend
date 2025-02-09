import { UUID } from 'crypto'

export default class MockWriteResponse {
  public articleId: UUID

  constructor(articleId: UUID) {
    this.articleId = articleId
  }
}
