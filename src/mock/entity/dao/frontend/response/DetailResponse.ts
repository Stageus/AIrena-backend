import { UUID } from 'crypto'

export default class DetailResponse {
  title: string
  description: string
  createdAt: string
  quizCount: number
  writerNickname: string
  images: string[]
  firstQuizIdx: UUID

  constructor(
    title: string,
    description: string,
    createdAt: string,
    quizCount: number,
    writerNickname: string,
    images: string[],
    firstQuizIdx: UUID,
  ) {
    this.title = title
    this.description = description
    this.createdAt = createdAt
    this.quizCount = quizCount
    this.writerNickname = writerNickname
    this.images = images
    this.firstQuizIdx = firstQuizIdx
  }
}
