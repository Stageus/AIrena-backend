import { postgres } from '#config/postgres'
import { UUID } from 'crypto'
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
      `,
      [memberIdx, quizIdx, submitAnswer, correctAnswer, score, maxScore],
    )
  }

  static async selectAnswerSubmit(memberIdx: number, quizIdx: UUID) {
    return (
      await postgres.query(
        `
        SELECT
          asm.submit_answer AS "submitAnswer",
          asm.correct_answer AS "correctAnswer",
          asm.score,
          asm.max_score AS "maxScore",
          current_quiz.reason,
          (
            SELECT nextQuiz.idx
            FROM quiz nextQuiz
            WHERE nextQuiz.created_at > current_quiz.created_at
            ORDER BY nextQuiz.created_at ASC
            LIMIT 1
          ) AS "nextQuizIdx",
        current_quiz.mock_idx AS "mockIdx"
      FROM answer_submit asm
      JOIN quiz current_quiz ON asm.quiz_idx = current_quiz.idx
      WHERE asm.quiz_idx = $1 AND asm.member_idx = $2
      ORDER BY asm.created_at DESC
      LIMIT 1
        `,
        [quizIdx, memberIdx],
      )
    ).rows[0] as AnswerSubmitResultFromDB
  }
}
