import AnswerSubmitAdapter from '#adapter/AnswerSubmitAdapter'
import MockAdapter from '#adapter/MockAdapter'
import SubmitAnswerRequest from '#dto/frontend/request/AnswerSubmitRequest'
import MockQuizRequest from '#dto/frontend/request/MockQuizRequest'
import AnswerSubmitResponse from '#dto/frontend/response/AnswerSubmitResponse'
import SubmitAnswer from '#entity/SubmitAnswer'
import ErrorRegistry from '#error/ErrorRegistry'

export default class AnswerSubmitService {
  static async submitAnswer(
    memberIdx: number,
    path: MockQuizRequest,
    body: SubmitAnswerRequest,
  ): Promise<AnswerSubmitResponse> {
    const quiz = await MockAdapter.getMockQuiz(memberIdx, path.idx)

    const type = quiz.type

    if (type == 'SINGLE_CHOICE') {
      const singleChoiceAnswer = body.singleChoiceAnswer
      if (singleChoiceAnswer == null) {
        throw ErrorRegistry.INVALID_INPUT_FORMAT
      }
      if (quiz.singleChoiceCorrectAnswer == null) {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }

      const submitAnswer = SubmitAnswer.gradeSingleChoiceAnswer(
        memberIdx,
        quiz.idx,
        singleChoiceAnswer,
        quiz.singleChoiceCorrectAnswer,
      )

      if (quiz.singleChoiceChoices == null) {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }

      const correctAnswer =
        quiz.singleChoiceChoices[quiz.singleChoiceCorrectAnswer]

      AnswerSubmitAdapter.saveAnswer(submitAnswer)
      return new AnswerSubmitResponse(
        correctAnswer,
        quiz.reason,
        submitAnswer.score,
        submitAnswer.maxScore,
      )
    }
    if (type == 'TEXT') {
      const textAnswer = body.textAnswer
      if (textAnswer == null) {
        throw ErrorRegistry.INVALID_INPUT_FORMAT
      }
      if (quiz.textCorrectAnswer == null) {
        throw ErrorRegistry.INTERNAL_SERVER_ERROR
      }
      const score = 100
      // (
      //   await AIAdapter.gradeTextAnswer([textAnswer], quiz.textCorrectAnswer)
      // )[0]

      const submitAnswer = new SubmitAnswer(
        memberIdx,
        quiz.idx,
        null,
        textAnswer,
        score,
        100,
      )

      AnswerSubmitAdapter.saveAnswer(submitAnswer)
      return new AnswerSubmitResponse(
        quiz.textCorrectAnswer,
        quiz.reason,
        submitAnswer.score,
        submitAnswer.maxScore,
      )
    }
    throw ErrorRegistry.INVALID_INPUT_FORMAT
  }
}
