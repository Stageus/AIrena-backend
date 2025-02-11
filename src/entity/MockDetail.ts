import MockResultFromDB from '#dto/db/MockResultFromDB'
import { UUID } from 'crypto'

export default class MockDetail {
  idx: UUID
  title: string
  description: string
  createdAt: string
  quizCount: number
  likeCount: number
  writerNickname: string
  images: string[]

  constructor(
    idx: UUID,
    title: string,
    description: string,
    createdAt: string,
    quizCount: number,
    likeCount: number,
    writerNickname: string,
    images: string[],
  ) {
    this.idx = idx
    this.title = title
    this.description = description
    this.createdAt = createdAt
    this.quizCount = quizCount
    this.likeCount = likeCount
    this.writerNickname = writerNickname
    this.images = images
  }

  static of(mockResultFromDB: MockResultFromDB) {
    return new MockDetail(
      mockResultFromDB.idx,
      mockResultFromDB.title,
      mockResultFromDB.description,
      mockResultFromDB.createdAt,
      mockResultFromDB.quizCount,
      mockResultFromDB.likeCount,
      mockResultFromDB.writerNickname,
      mockResultFromDB.images,
    )
  }
}
