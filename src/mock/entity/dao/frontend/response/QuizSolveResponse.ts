export default class QuizSolveResponse {
  submitAnswer: string
  correctAnswer: string
  score: number
  maxScore: number
  reason: string

  constructor(
    submitAnswer: string,
    correctAnswer: string,
    score: number,
    maxScore: number,
    reason: string,
  ) {
    this.submitAnswer = submitAnswer
    this.correctAnswer = correctAnswer
    this.score = score
    this.maxScore = maxScore
    this.reason = reason
  }
}
