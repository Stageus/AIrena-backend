interface GenerateQuizRequestToAIParams {
  title: string
  content: string
  subject: string
  quizCount: number
}

export default class GenerateQuizRequestToAI {
  public title: string
  public content: string
  public subject: string
  public quizCount: number

  constructor(params: GenerateQuizRequestToAIParams) {
    this.title = params.title
    this.content = params.content
    this.subject = params.subject
    this.quizCount = params.quizCount
  }

  static of(params: GenerateQuizRequestToAIParams): GenerateQuizRequestToAI {
    return new GenerateQuizRequestToAI(params)
  }
}
