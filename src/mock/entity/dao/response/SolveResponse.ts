export default class SolveResponse {
  submitAnswer: string
  correctAnswer: string
  score: number
  maxScore: number
  reason: string
  currentQuizIndex: number
  totalQuizCount: number

  constructor(
    submitAnswer: string,
    correctAnswer: string,
    score: number,
    maxScore: number,
    reason: string,
    currentQuizIndex: number,
    totalQuizCount: number,
  ) {
    this.submitAnswer = submitAnswer
    this.correctAnswer = correctAnswer
    this.score = score
    this.maxScore = maxScore
    this.reason = reason
    this.currentQuizIndex = currentQuizIndex
    this.totalQuizCount = totalQuizCount
  }
}
