import Quiz from 'src/mock/entity/dto/Quiz.js'

export default class QuizResponse {
  public type: 'SINGLE_CHOICE' | 'TEXT'
  public title: string
  public description: string
  public singleChoiceChoices: string[] | null
  public currentQuizIndex: number
  public totalQuizCount: number

  static of(quiz: Quiz) {
    return new QuizResponse(
      quiz.type,
      quiz.title,
      quiz.description,
      quiz.singleChoiceChoices,
      quiz.currentQuizIndex,
      quiz.totalQuizCount,
    )
  }

  constructor(
    type: 'SINGLE_CHOICE' | 'TEXT',
    title: string,
    description: string,
    singleChoiceChoices: string[] | null,
    currentQuizIndex: number,
    totalQuizCount: number,
  ) {
    this.type = type
    this.title = title
    this.description = description
    this.singleChoiceChoices = singleChoiceChoices
    this.currentQuizIndex = currentQuizIndex
    this.totalQuizCount = totalQuizCount
  }
}
