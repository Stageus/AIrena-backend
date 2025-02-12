export default interface AnswerSubmitResultFromDB {
  submitAnswer: string
  correctAnswer: string
  score: number
  maxScore: number
  reason: string
  currentQuizIndex: number
  totalQuizCount: number
}
