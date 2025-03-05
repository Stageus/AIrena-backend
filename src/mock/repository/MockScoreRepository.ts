import { postgres } from '#config/postgres'
import { UUID } from 'crypto'
import MockScoreResultFromDB from '../entity/dao/db/MockScoreResultFromDB.js'

export default class MockScoreRepository {
  static async getScore(memberIdx: number, mockIdx: UUID) {
    return (
      await postgres.query(
        `
        WITH row_numbered_mock_score AS (
          SELECT
            *,
            ROW_NUMBER() OVER (PARTITION BY member_idx ORDER BY created_at DESC) AS rn
          FROM mock_score
          WHERE mock_idx = $2
        ),
        first_mock_score AS (
          SELECT *
          FROM row_numbered_mock_score r1
          WHERE rn = (
            SELECT MAX(rn)
            FROM row_numbered_mock_score r2
            WHERE r2.member_idx = r1.member_idx
          )
        ),
        latest_mock_score_for_member AS (
          SELECT *
          FROM row_numbered_mock_score
          WHERE member_idx = $1 AND rn = 1
        )
        SELECT
          lm.score AS "score",
          lm.max_score AS "maxScore",
          (
            SELECT COUNT(*)
            FROM first_mock_score fms
            WHERE fms.score >= lm.score
          ) AS "greaterEqualCandidateCount",
          (
            SELECT COUNT(*)
            FROM first_mock_score
          ) AS "totalCandidateCount"
        FROM latest_mock_score_for_member lm;
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
        FROM (
            SELECT
                score,
                max_score,
                ROW_NUMBER() OVER (PARTITION BY quiz_idx ORDER BY created_at DESC) AS rn
            FROM answer_submit
            WHERE member_idx = $2
              AND quiz_idx IN (SELECT idx FROM quiz_index_cte)
        ) AS t
        WHERE rn = 1
      )
      INSERT INTO mock_score(member_idx, mock_idx, score, max_score, created_at)
      SELECT
        $2,
        $1,
        total_score,
        total_max_score,
        NOW()
      FROM score_sum_cte
      `,
      [mockIdx, memberIdx],
    )
  }

  static async saveScoreForRank(memberIdx: number, mockIdx: UUID) {
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
        FROM (
            SELECT
                score,
                max_score,
                ROW_NUMBER() OVER (PARTITION BY quiz_idx ORDER BY created_at ASC) AS rn
            FROM answer_submit
            WHERE member_idx = $2
              AND quiz_idx IN (SELECT idx FROM quiz_index_cte)
        ) AS t
        WHERE rn = 1
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

  static async getRank(mockIdx: UUID) {
    return await postgres.query(
      `SELECT
        RANK() OVER (ORDER BY score DESC) AS "rank",
        member.nickName AS "nickName",
        score,
      FROM mock_score 
      JOIN member ON mock_score.member_idx = member.idx
      WHERE mock_idx = $1 
      ORDER BY score DESC`,
      [mockIdx],
    )
  }
}
