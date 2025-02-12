import Quiz from '#entity/Quiz'

export default class MockQuizResponse {
  public type: 'SINGLE_CHOICE' | 'TEXT'
  public title: string
  public description: string
  public singleChoiceChoices: string[] | null
  public currentQuizIndex: number
  public totalQuizCount: number

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

  static of(quiz: Quiz) {
    return new MockQuizResponse(
      quiz.type,
      quiz.title,
      quiz.description,
      quiz.singleChoiceChoices,
      quiz.currentQuizIndex,
      quiz.totalQuizCount,
    )
  }
}
