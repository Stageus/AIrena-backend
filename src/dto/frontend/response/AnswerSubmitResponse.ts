export default class AnswerSubmitResponse {
  submitAnswer: string
  correctAnswer: string
  reason: string
  score: number
  maxScore: number

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
