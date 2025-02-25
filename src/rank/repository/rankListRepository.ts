import { postgres } from '#config/postgres'

export default class RankListRepository {
  static async getRankListFromDb(
    sortType: string,
    nicknameToSearch: string,
    rangeToGet: string,
  ) {
    return await postgres.query(
      `
      WITH ranked_members AS (
        SELECT 
          RANK() OVER(ORDER BY score DESC, created_at ASC) AS rank, -- 점수 기준으로 순위를 매기고, 동점일 경우 오래된 생성 일자가 우선
          COUNT(*) OVER() AS total_count, -- 전체 사용자 수 계산
          nickname,
          score,
          created_at
        FROM member
      )
      SELECT 
        rank,
        CASE 
          WHEN total_count <= 10 THEN -- 사용자 수가 10명 이하인 경우
            CASE 
              WHEN rank = 1 THEN 'DIAMOND'
              WHEN rank = 2 THEN 'PLATINUM'
              WHEN rank BETWEEN 3 AND 5 THEN 'GOLD'
              WHEN rank BETWEEN 6 AND 8 THEN 'SILVER'
              ELSE 'BRONZE'
            END
          WHEN score = 0 THEN 'BRONZE' -- 모든 점수가 0인 경우 'BRONZE'로 할당
          WHEN rank BETWEEN 1 AND total_count * 0.06 THEN 'DIAMOND'  -- 상위 6%
          WHEN rank BETWEEN total_count * 0.06 + 1 AND total_count * 0.12 THEN 'PLATINUM' -- 상위 6~12%
          WHEN rank BETWEEN total_count * 0.12 + 1 AND total_count * 0.30 THEN 'GOLD' -- 상위 12~30%
          WHEN rank BETWEEN total_count * 0.30 + 1 AND total_count * 0.50 THEN 'SILVER' -- 상위 30~50%
          ELSE 'BRONZE' -- 나머지 (하위 50%)
        END AS tier,
        nickname,
        score
      FROM ranked_members
      WHERE rank <= 10
      LIMIT 10;
      `,
    )
  }

  static async getFilteredRankListFromDb(nicknameToSearch: string) {
    return await postgres.query('SELECT * FROM member WHERE id = $1', [
      nicknameToSearch,
    ])
  }
}
