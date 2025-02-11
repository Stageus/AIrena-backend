export default class AnswerSubmitResponse {
  correctAnswer: string
  reason: string
  score: number
  maxScore: number

  constructor(
    correctAnswer: string,
    reason: string,
    score: number,
    maxScore: number,
  ) {
    this.correctAnswer = correctAnswer
    this.reason = reason
    this.score = score
    this.maxScore = maxScore
  }
}
