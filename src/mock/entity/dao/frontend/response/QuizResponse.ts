export default class QuizResponse {
  public type: 'SINGLE_CHOICE' | 'TEXT'
  public title: string
  public description: string
  public singleChoiceChoices: string[] | null

  static ofSingleChoice(
    title: string,
    description: string,
    singleChoiceChoices: string[],
  ) {
    return new QuizResponse(
      'SINGLE_CHOICE',
      title,
      description,
      singleChoiceChoices,
    )
  }

  static ofText(title: string, description: string) {
    return new QuizResponse('TEXT', title, description, null)
  }

  constructor(
    type: 'SINGLE_CHOICE' | 'TEXT',
    title: string,
    description: string,
    singleChoiceChoices: string[] | null,
  ) {
    this.type = type
    this.title = title
    this.description = description
    this.singleChoiceChoices = singleChoiceChoices
  }
}
