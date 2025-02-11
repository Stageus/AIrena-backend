import Quiz from '#entity/Quiz'

export default interface TextQuizResponseFromAI {
  quizzes: TextQuiz[]
}

export class TextQuiz {
  // 퀴즈의 제목입니다
  title: string
  // 퀴즈에서 묻는 질문입니다
  description: string
  // 주관식 옳은 정답을 알려줍니다
  correctAnswer: string
  // 정답의 이유를 알려줍니다
  reason: string

  constructor(
    title: string,
    description: string,
    correctAnswer: string,
    reason: string,
  ) {
    this.title = title
    this.description = description
    this.correctAnswer = correctAnswer
    this.reason = reason
  }

  toQuiz() {
    return new Quiz(
      0,
      this.title,
      'TEXT',
      this.description,
      null,
      null,
      this.correctAnswer,
      this.reason,
      0,
      0,
    )
  }
}
