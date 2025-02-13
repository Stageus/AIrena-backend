import ErrorRegistry from '#error/ErrorRegistry'
import Quiz from '../mock/entity/dto/Quiz.js'

export default class SubmitAnswer {
  static MAX_SCORE: number = 100
  memberIdx: number
  quizIdx: number
  submitAnswer: string
  correctAnswer: string
  score: number

  constructor(
    memberIdx: number,
    quizIdx: number,
    submitAnswer: string,
    correctAnswer: string,
    score: number,
  ) {
    this.memberIdx = memberIdx
    this.quizIdx = quizIdx
    this.submitAnswer = submitAnswer
    this.correctAnswer = correctAnswer
    this.score = score
  }

  static gradeSingleChoiceAnswer(
    memberIdx: number,
    quiz: Quiz,
    submitSingleChoiceAnswer: number,
  ): SubmitAnswer {
    if (quiz.singleChoiceCorrectAnswer == null) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
    if (quiz.singleChoiceChoices == null) {
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }

    const correctAnswer = quiz.singleChoiceCorrectAnswer
    const score =
      submitSingleChoiceAnswer === correctAnswer ? this.MAX_SCORE : 0

    const textSubmitAnswer = quiz.singleChoiceChoices[submitSingleChoiceAnswer]
    const textCorrectAnswer = quiz.singleChoiceChoices[correctAnswer]
    return new SubmitAnswer(
      memberIdx,
      quiz.idx,
      textSubmitAnswer,
      textCorrectAnswer,
      score,
    )
  }

  static gradeTextAnswer(
    memberIdx: number,
    quiz: Quiz,
    submitAnswer: string,
    score: number,
  ): SubmitAnswer {
    return new SubmitAnswer(
      memberIdx,
      quiz.idx,
      submitAnswer,
      quiz.textCorrectAnswer,
      score,
    )
  }
}
