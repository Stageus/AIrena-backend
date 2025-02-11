export default class SubmitAnswer {
  memberIdx: number
  quizIdx: number
  submitSingleChoiceAnswer: number | null
  submitTextAnswer: string | null
  score: number
  maxScore: number

  constructor(
    memberIdx: number,
    quizIdx: number,
    submitSingleChoiceAnswer: number | null,
    submitTextAnswer: string | null,
    score: number,
    maxScore: number,
  ) {
    this.memberIdx = memberIdx
    this.quizIdx = quizIdx
    this.submitSingleChoiceAnswer = submitSingleChoiceAnswer
    this.submitTextAnswer = submitTextAnswer
    this.score = score
    this.maxScore = maxScore
  }

  static gradeSingleChoiceAnswer(
    memberIdx: number,
    quizIdx: number,
    submitSingleChoiceAnswer: number,
    correctAnswer: number,
    maxScore: number = 100,
  ): SubmitAnswer {
    const score = submitSingleChoiceAnswer === correctAnswer ? maxScore : 0
    return new SubmitAnswer(
      memberIdx,
      quizIdx,
      submitSingleChoiceAnswer,
      null,
      score,
      maxScore,
    )
  }
}
