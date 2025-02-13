import { randomUUID, UUID } from 'crypto'
import Quiz from './Quiz.js'

export default class Mock {
  idx: UUID
  memberIdx: number
  title: string
  description: string
  quizCount: number
  quizzes: Quiz[]

  constructor(
    memberIdx: number,
    title: string,
    description: string,
    quizCount: number,
    quizzes: Quiz[],
  ) {
    this.idx = randomUUID()
    this.memberIdx = memberIdx
    this.title = title
    this.description = description
    this.quizCount = quizCount
    this.quizzes = quizzes
  }
}
