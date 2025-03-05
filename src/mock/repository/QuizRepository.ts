import { postgres } from '#config/postgres'
import { UUID } from 'crypto'
import QuizResultFormDB from '../entity/dao/db/QuizResultFormDB.js'

export default class QuizRepository {
  static async getQuiz(quizIdx: UUID) {
    return (
      await postgres.query(
        `
        SELECT
          idx,
          type,
          title,
          description,
          single_choice_choices AS "singleChoiceChoices",
          single_choice_correct_answer AS "singleChoiceCorrectAnswer",
          text_correct_answer AS "textCorrectAnswer",
          reason
        FROM quiz
        WHERE idx = $1
        `,
        [quizIdx],
      )
    ).rows[0] as QuizResultFormDB
  }
}
