import { UUID } from 'crypto'

export default class QuizSolveResponse {
  submitAnswer: string
  correctAnswer: string
  score: number
  maxScore: number
  reason: string
  nextQuizIdx: UUID

  constructor(
    submitAnswer: string,
    correctAnswer: string,
    score: number,
    maxScore: number,
    reason: string,
    nextQuizIdx: UUID,
  ) {
    this.submitAnswer = submitAnswer
    this.correctAnswer = correctAnswer
    this.score = score
    this.maxScore = maxScore
    this.reason = reason
    this.nextQuizIdx = nextQuizIdx
  }
}
