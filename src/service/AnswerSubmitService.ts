// import AnswerSubmitAdapter from '#adapter/AnswerSubmitAdapter'
// import MockAdapter from '#adapter/MockAdapter'
// import MockScoreAdapter from '#adapter/MockScoreAdapter'
// import SubmitAnswerRequest from '#dto/frontend/request/AnswerSubmitRequest'
// import MockQuizRequest from '#dto/frontend/request/MockQuizRequest'
// import AnswerSubmitResponse from '#dto/frontend/response/AnswerSubmitResponse'
// import SubmitAnswer from '#entity/SubmitAnswer'
// import ErrorRegistry from '#error/ErrorRegistry'
// import AIAdapter from 'src/core/adapter/AIAdapter.js'

// export default class AnswerSubmitService {
//   static async getGradingResult(
//     memberIdx: number,
//     path: MockQuizRequest,
//   ): Promise<AnswerSubmitResponse> {
//     const gradingResult = await AnswerSubmitAdapter.getAnswer(
//       memberIdx,
//       path.idx,
//     )
//     return new AnswerSubmitResponse(
//       gradingResult.submitAnswer,
//       gradingResult.correctAnswer,
//       gradingResult.score,
//       gradingResult.maxScore,
//       gradingResult.reason,
//       gradingResult.currentQuizIndex,
//       gradingResult.totalQuizCount,
//     )
//   }

//   static async submitAnswer(
//     memberIdx: number,
//     path: MockQuizRequest,
//     body: SubmitAnswerRequest,
//   ): Promise<void> {
//     const quiz = await MockAdapter.getMockQuiz(memberIdx, path.idx)

//     const type = quiz.type

//     if (type == 'SINGLE_CHOICE') {
//       const singleChoiceAnswer = body.singleChoiceAnswer
//       if (singleChoiceAnswer == null) {
//         console.log('singleChoiceAnswer is null')
//         throw ErrorRegistry.INVALID_INPUT_FORMAT
//       }

//       const submitAnswer = SubmitAnswer.gradeSingleChoiceAnswer(
//         memberIdx,
//         quiz,
//         singleChoiceAnswer,
//       )

//       if (quiz.singleChoiceChoices == null) {
//         throw ErrorRegistry.INTERNAL_SERVER_ERROR
//       }

//       AnswerSubmitAdapter.saveAnswer(submitAnswer)
//       if (quiz.currentQuizIndex == quiz.totalQuizCount) {
//         await MockScoreAdapter.saveScore(memberIdx, quiz.idx)
//       }
//     } else if (type == 'TEXT') {
//       const textAnswer = body.textAnswer
//       if (textAnswer == null) {
//         throw ErrorRegistry.INVALID_INPUT_FORMAT
//       }

//       const correctAnswer = quiz.textCorrectAnswer
//       if (correctAnswer == null) {
//         throw ErrorRegistry.INTERNAL_SERVER_ERROR
//       }

//       const score = (
//         await AIAdapter.gradeTextAnswer([textAnswer], correctAnswer)
//       ).score

//       const submitAnswer = SubmitAnswer.gradeTextAnswer(
//         memberIdx,
//         quiz,
//         textAnswer,
//         score,
//       )

//       AnswerSubmitAdapter.saveAnswer(submitAnswer)
//       if (quiz.currentQuizIndex == quiz.totalQuizCount) {
//         await MockScoreAdapter.saveScore(memberIdx, quiz.idx)
//       }
//     } else {
//       throw ErrorRegistry.INVALID_INPUT_FORMAT
//     }
//   }
// }
