import { postgres } from '#config/postgres'
import AnswerSubmitResultFromDB from '../entity/dao/db/AnswerSubmitResultFromDB.js'

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
      SELECT $1, $2, $3, $4, $5, $6
      WHERE NOT EXISTS (
          SELECT 1 FROM answer_submit
          WHERE member_idx = $1 AND quiz_idx = $2
      );
      `,
      [memberIdx, quizIdx, submitAnswer, correctAnswer, score, maxScore],
    )
  }

  static async selectAnswerSubmit(memberIdx: number, quizIdx: number) {
    return (
      await postgres.query(
        `
        SELECT 
          answer_submit.submit_answer AS "submitAnswer",
          answer_submit.correct_answer AS "correctAnswer",
          answer_submit.score,
          answer_submit.max_score AS "maxScore",
          quiz.reason
        FROM answer_submit
        JOIN quiz ON answer_submit.quiz_idx = quiz.idx
        WHERE answer_submit.quiz_idx = $1 AND answer_submit.member_idx = $2
        `,
        [quizIdx, memberIdx],
      )
    ).rows[0] as AnswerSubmitResultFromDB
  }
}
