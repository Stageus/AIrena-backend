import { UUID } from 'crypto'

export default interface AnswerSubmitResultFromDB {
  submitAnswer: string
  correctAnswer: string
  score: number
  maxScore: number
  reason: string
  nextQuizIdx: UUID
  mockIdx: UUID
}
