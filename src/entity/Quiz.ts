import QuizResultFormDB from '#dto/db/QuizResultFormDB'

export default class Quiz {
  public idx: number
  public title: string
  public type: 'SINGLE_CHOICE' | 'TEXT'
  public description: string
  public singleChoiceChoices: string[] | null
  public singleChoiceCorrectAnswer: number | null
  public textCorrectAnswer: string | null
  public reason: string
  public currentQuizIndex: number
  public totalQuizCount: number

  constructor(
    idx: number,
    title: string,
    type: 'SINGLE_CHOICE' | 'TEXT',
    description: string,
    singleChoiceChoices: string[] | null,
    singleChoiceCorrectAnswer: number | null,
    textCorrectAnswer: string | null,
    reason: string,
    currentQuizIndex: number,
    totalQuizCount: number,
  ) {
    this.idx = idx
    this.title = title
    this.type = type
    this.description = description
    this.singleChoiceChoices = singleChoiceChoices
    this.singleChoiceCorrectAnswer = singleChoiceCorrectAnswer
    this.textCorrectAnswer = textCorrectAnswer
    this.reason = reason
    this.currentQuizIndex = currentQuizIndex
    this.totalQuizCount = totalQuizCount
  }

  static of(params: QuizResultFormDB) {
    return new Quiz(
      params.idx,
      params.title,
      params.type,
      params.description,
      params.singleChoiceChoices,
      params.singleChoiceCorrectAnswer,
      params.textCorrectAnswer,
      params.reason,
      params.currentQuizIndex,
      params.totalQuizCount,
    )
  }
}
