export default class QuizInfo {
  public title: string
  public content: string
  public subject: string
  public quizCount: number

  constructor(
    title: string,
    content: string,
    subject: string,
    quizCount: number,
  ) {
    this.title = title
    this.content = content
    this.subject = subject
    this.quizCount = quizCount
  }
}
