import { UUID } from 'crypto'

export default class DetailResponse {
  title: string
  description: string
  createdAt: string
  quizCount: number
  writerNickname: string
  images: string[]
  firstQuizIdx: UUID
  ranks: {
    rank: number
    nickName: string
    score: number
  }[]

  constructor(
    title: string,
    description: string,
    createdAt: string,
    quizCount: number,
    writerNickname: string,
    images: string[],
    firstQuizIdx: UUID,
    ranks: {
      rank: number
      nickName: string
      score: number
    }[],
  ) {
    this.title = title
    this.description = description
    this.createdAt = createdAt
    this.quizCount = quizCount
    this.writerNickname = writerNickname
    this.images = images
    this.firstQuizIdx = firstQuizIdx
    this.ranks = ranks
  }
}
