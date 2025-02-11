import SubmitAnswer from '#entity/SubmitAnswer'
import AnswerSubmitRepository from '#repository/AnswerSubmitRepository'

export default class AnswerSubmitAdapter {
  static async saveAnswer(submitAnswer: SubmitAnswer) {
    await AnswerSubmitRepository.insertAnswerSubmit(
      submitAnswer.memberIdx,
      submitAnswer.quizIdx,
      submitAnswer.submitSingleChoiceAnswer,
      submitAnswer.submitTextAnswer,
      submitAnswer.score,
      submitAnswer.maxScore,
    )
  }
}
