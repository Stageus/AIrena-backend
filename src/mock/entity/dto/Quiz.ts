export default class Quiz {
  public title: string
  public type: 'SINGLE_CHOICE' | 'TEXT'
  public description: string
  public singleChoiceChoices: string[] | null
  public singleChoiceCorrectAnswer: number | null
  public textCorrectAnswer: string | null
  public reason: string

  static toSingleChoiceQuiz(
    title: string,
    description: string,
    choices: string[],
    correctChoice: number,
    reason: string,
  ): Quiz {
    return new Quiz(
      title,
      'SINGLE_CHOICE',
      description,
      choices,
      correctChoice,
      null,
      reason,
    )
  }

  static toTextQuiz(
    title: string,
    description: string,
    correctAnswer: string,
    reason: string,
  ): Quiz {
    return new Quiz(
      title,
      'TEXT',
      description,
      null,
      null,
      correctAnswer,
      reason,
    )
  }

  constructor(
    title: string,
    type: 'SINGLE_CHOICE' | 'TEXT',
    description: string,
    singleChoiceChoices: string[] | null,
    singleChoiceCorrectAnswer: number | null,
    textCorrectAnswer: string | null,
    reason: string,
  ) {
    this.title = title
    this.type = type
    this.description = description
    this.singleChoiceChoices = singleChoiceChoices
    this.singleChoiceCorrectAnswer = singleChoiceCorrectAnswer
    this.textCorrectAnswer = textCorrectAnswer
    this.reason = reason
  }
}
