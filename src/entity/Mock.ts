import { randomUUID, UUID } from 'crypto'

export default class Mock {
  idx: UUID
  memberIdx: number
  title: string
  description: string
  quizCount: number

  constructor(
    memberIdx: number,
    title: string,
    description: string,
    quizCount: number,
  ) {
    this.idx = randomUUID()
    this.memberIdx = memberIdx
    this.title = title
    this.description = description
    this.quizCount = quizCount
  }
}
