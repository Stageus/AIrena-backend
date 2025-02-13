export default interface QuizResultFormDB {
  idx: number
  title: string
  type: 'SINGLE_CHOICE' | 'TEXT'
  description: string
  singleChoiceChoices: string[] | null
  singleChoiceCorrectAnswer: number | null
  textCorrectAnswer: string | null
  reason: string
  currentQuizIndex: number
  totalQuizCount: number
}
