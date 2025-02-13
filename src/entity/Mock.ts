import Quiz from '../mock/entity/dto/Quiz.js'

export default class Mock {
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
    this.memberIdx = memberIdx
    this.title = title
    this.description = description
    this.quizCount = quizCount
    this.quizzes = quizzes
  }
}
