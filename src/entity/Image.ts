import { UUID } from 'crypto'

export default class Image {
  articleId: UUID
  urls: string[]

  constructor(articleId: UUID, urls: string[]) {
    this.articleId = articleId
    this.urls = urls
  }
}
