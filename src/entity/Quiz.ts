export default class Quiz {
  public title: string
  public type: 'SINGLE_CHOICE' | 'TEXT'
  public description: string
  public choices: string[] | null
  public singleChoiceCorrectAnswer: number | null
  public textCorrectAnswer: string | null
  public reason: string

  constructor(
    title: string,
    type: 'SINGLE_CHOICE' | 'TEXT',
    description: string,
    choices: string[] | null,
    singleChoiceCorrectAnswer: number | null,
    textCorrectAnswer: string | null,
    reason: string,
  ) {
    this.title = title
    this.type = type
    this.description = description
    this.choices = choices
    this.singleChoiceCorrectAnswer = singleChoiceCorrectAnswer
    this.textCorrectAnswer = textCorrectAnswer
    this.reason = reason
  }
}
