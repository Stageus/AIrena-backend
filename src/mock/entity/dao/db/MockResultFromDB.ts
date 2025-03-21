import { UUID } from 'crypto'

export default interface MockResultFromDB {
  idx: UUID
  title: string
  description: string
  createdAt: string
  quizCount: number
  likeCount: number
  writerNickname: string
  images: string[]
  firstQuizIdx: UUID
  ranks: {
    rank: number
    nickName: string
    score: number
  }[]
}
