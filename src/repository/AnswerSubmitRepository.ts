import { postgres } from '#config/postgres'
import QuizResultFormDB from '#dto/db/QuizResultFormDB'

export default class AnswerSubmitRepository {
  static async insertAnswerSubmit(
    memberIdx: number,
    quizIdx: number,
    submitSingleChoiceAnswer: number | null,
    submitTextAnswer: string | null,
    score: number,
    maxScore: number,
  ) {
    return (
      await postgres.query(
        `
        INSERT INTO answer_submit (member_idx, quiz_idx, submit_single_choice_answer, submit_text_answer, score, max_score)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          memberIdx,
          quizIdx,
          submitSingleChoiceAnswer,
          submitTextAnswer,
          score,
          maxScore,
        ],
      )
    ).rows[0] as QuizResultFormDB
  }
}
