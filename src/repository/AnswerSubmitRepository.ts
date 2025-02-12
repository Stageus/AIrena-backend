import { postgres } from '#config/postgres'
import AnswerSubmitResultFromDB from '#dto/db/AnswerSubmitResultFromDB'
import { UUID } from 'crypto'

export default class AnswerSubmitRepository {
  static async insertAnswerSubmit(
    memberIdx: number,
    quizIdx: number,
    submitAnswer: string,
    correctAnswer: string,
    score: number,
    maxScore: number,
  ) {
    return await postgres.query(
      `
      INSERT INTO answer_submit (member_idx, quiz_idx, submit_answer, correct_answer, score, max_score)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [memberIdx, quizIdx, submitAnswer, correctAnswer, score, maxScore],
    )
  }

  static async selectAnswerSubmit(memberIdx: number, mockIdx: UUID) {
    return (
      await postgres.query(
        `
        WITH quiz AS (
          SELECT 
            idx,
            reason,
            row_number() OVER (ORDER BY created_at ASC) AS row_num,
            count(*) OVER () AS quiz_count                          
          FROM quiz
          WHERE mock_idx = $1
        )
        SELECT 
          answer_submit.submit_answer AS "submitAnswer",
          answer_submit.correct_answer AS "correctAnswer",
          answer_submit.score,
          answer_submit.max_score AS "maxScore",
          quiz.reason,
          quiz.row_num AS "currentQuizIndex",
          quiz.quiz_count "totalQuizCount"
        FROM answer_submit
        JOIN quiz ON answer_submit.quiz_idx = quiz.idx
        WHERE answer_submit.member_idx = $2
        ORDER BY created_at DESC
        LIMIT 1;
        `,
        [mockIdx, memberIdx],
      )
    ).rows[0] as AnswerSubmitResultFromDB
  }
}
