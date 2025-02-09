import { UUID } from 'crypto'

export default class MockPostResponse {
  public articleId: UUID

  constructor(articleId: UUID) {
    this.articleId = articleId
  }
}
