import { UUID } from 'crypto'

export default class Image {
  articleIdx: UUID
  urls: string[]

  constructor(articleIdx: UUID, urls: string[]) {
    this.articleIdx = articleIdx
    this.urls = urls
  }
}
