import { postgres } from '#config/postgres'
import MockScoreResultFromDB from '#dto/db/MockScoreResultFromDB'
import { UUID } from 'crypto'

export default class MockScoreRepository {
  static async insertScore(memberIdx: number, quizIdx: number) {
    await postgres.query(
      `
      WITH mock_idx_cte AS (
        SELECT mock_idx
        FROM quiz
        WHERE idx = $1
      ),
      quiz_index_cte AS (
        SELECT idx
        FROM quiz
        WHERE quiz.mock_idx = (SELECT mock_idx FROM mock_idx_cte)
      ),
      score_sum_cte AS (
        SELECT
          SUM(score) AS total_score,
          SUM(max_score) AS total_max_score
        FROM answer_submit
        WHERE member_idx = $2
          AND quiz_idx IN (SELECT idx FROM quiz_index_cte)
      )
      INSERT INTO mock_score(member_idx, mock_idx, score, max_score, created_at)
      SELECT 
        $2,
        (SELECT mock_idx FROM mock_idx_cte),
        total_score,
        total_max_score,
        NOW()
      FROM score_sum_cte;
      `,
      [quizIdx, memberIdx],
    )
  }

  static async getScore(memberIdx: number, mockIdx: UUID) {
    return (
      await postgres.query(
        `
        WITH current_member AS (
          SELECT score, max_score
          FROM mock_score
          WHERE member_idx = $1
            AND mock_idx = $2
          ORDER BY created_at DESC
          LIMIT 1
        )
        SELECT
          cm.score,
          cm.max_score AS "maxScore",
          (SELECT COUNT(*) FROM mock_score WHERE mock_idx = $2 AND score >= cm.score) AS "greaterEqualCandidateCount",
          (SELECT COUNT(*) FROM mock_score WHERE mock_idx = $2) AS "totalCandidateCount"
        FROM current_member cm;
        `,
        [memberIdx, mockIdx],
      )
    ).rows[0] as MockScoreResultFromDB
  }
}
