import { postgres } from '#config/postgres'
import { UUID } from 'crypto'
import MockScoreResultFromDB from '../entity/dao/db/MockScoreResultFromDB.js'

export default class MockScoreRepository {
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

  static async saveScore(memberIdx: number, mockIdx: UUID) {
    await postgres.query(
      `
      WITH quiz_index_cte AS (
        SELECT idx
        FROM quiz
        WHERE quiz.mock_idx = $1
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
        $1,
        total_score,
        total_max_score,
        NOW()
      FROM score_sum_cte
      WHERE NOT EXISTS (
          SELECT 1 FROM mock_score
          WHERE member_idx = $2 AND mock_idx = $1
      );
      `,
      [mockIdx, memberIdx],
    )
  }
}
