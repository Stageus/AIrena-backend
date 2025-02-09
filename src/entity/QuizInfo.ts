export default class QuizInfo {
  public title: string
  public description: string
  public subject: string
  public quizCount: number

  constructor(
    title: string,
    description: string,
    subject: string,
    quizCount: number,
  ) {
    this.title = title
    this.description = description
    this.subject = subject
    this.quizCount = quizCount
  }
}
