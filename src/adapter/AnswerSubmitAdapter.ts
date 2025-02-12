import SubmitAnswer from '#entity/SubmitAnswer'
import AnswerSubmitRepository from '#repository/AnswerSubmitRepository'
import { UUID } from 'crypto'

export default class AnswerSubmitAdapter {
  static async saveAnswer(submitAnswer: SubmitAnswer) {
    await AnswerSubmitRepository.insertAnswerSubmit(
      submitAnswer.memberIdx,
      submitAnswer.quizIdx,
      submitAnswer.submitAnswer,
      submitAnswer.correctAnswer,
      submitAnswer.score,
      SubmitAnswer.MAX_SCORE,
    )
  }

  static async getAnswer(memberIdx: number, mockIdx: UUID) {
    return await AnswerSubmitRepository.selectAnswerSubmit(memberIdx, mockIdx)
  }
}
