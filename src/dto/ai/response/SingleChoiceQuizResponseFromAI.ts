import Quiz from '#entity/Quiz'

export default interface SingleChoiceQuizResponseFromAI {
  quizzes: SingleChoiceQuiz[]
}

export class SingleChoiceQuiz {
  // 퀴즈의 제목입니다
  title: string
  // 퀴즈에서 묻는 질문입니다
  description: string
  // 객관식 퀴즈의 선택지입니다
  choices: string[]
  // 객관식 옳은 정답을 알려줍니다
  correctChoice: number
  // 정답의 이유를 알려줍니다
  reason: string

  constructor(
    title: string,
    description: string,
    choices: string[],
    correctChoice: number,
    reason: string,
  ) {
    this.title = title
    this.description = description
    this.choices = choices
    this.correctChoice = correctChoice
    this.reason = reason
  }

  toQuiz() {
    return new Quiz(
      this.title,
      'SINGLE_CHOICE',
      this.description,
      this.choices,
      this.correctChoice,
      null,
      this.reason,
    )
  }
}
