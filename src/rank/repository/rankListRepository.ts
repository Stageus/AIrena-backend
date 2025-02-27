import { postgres } from '#config/postgres'

export default class RankListRepository {
  static async getRankListFromDb(current: number) {
    return (
      await postgres.query(
        `
      WITH ranked_members AS (
        SELECT 
          RANK() OVER(ORDER BY score DESC, created_at ASC) AS rank, 
          COUNT(*) OVER() AS total_count, 
          nickname,
          score,
          created_at
        FROM member_test
      )
      SELECT 
        rank,
        CASE 
          WHEN total_count <= 10 THEN
            CASE 
              WHEN rank = 1 THEN 'DIAMOND'
              WHEN rank = 2 THEN 'PLATINUM'
              WHEN rank BETWEEN 3 AND 5 THEN 'GOLD'
              WHEN rank BETWEEN 6 AND 8 THEN 'SILVER'
              ELSE 'BRONZE'
            END
          WHEN score = 0 THEN 'BRONZE'
          WHEN rank BETWEEN 1 AND total_count * 0.06 THEN 'DIAMOND'  
          WHEN rank BETWEEN total_count * 0.06 + 1 AND total_count * 0.12 THEN 'PLATINUM'
          WHEN rank BETWEEN total_count * 0.12 + 1 AND total_count * 0.30 THEN 'GOLD' 
          WHEN rank BETWEEN total_count * 0.30 + 1 AND total_count * 0.50 THEN 'SILVER'
          ELSE 'BRONZE' 
        END AS tier,
        nickname,
        score
      FROM ranked_members
      WHERE rank > $1
      ORDER BY rank 
      LIMIT 10;
      `,
        [current],
      )
    ).rows
  }

  static async getFilteredRankListFromDb(sortType: string, current: number) {
    return (
      await postgres.query(
        `      
      WITH ranked_members AS ( 
        SELECT  
          RANK() OVER(ORDER BY score DESC, created_at ASC) AS rank, 
          COUNT(*) OVER() AS total_count,  
          nickname, 
          score, 
          created_at 
        FROM member_test 
      ), 
      ranked_with_tiers AS ( 
        SELECT  
          rank, 
          CASE  
            WHEN total_count <= 10 THEN  
              CASE  
                WHEN rank = 1 THEN 'DIAMOND' 
                WHEN rank = 2 THEN 'PLATINUM' 
                WHEN rank BETWEEN 3 AND 5 THEN 'GOLD' 
                WHEN rank BETWEEN 6 AND 8 THEN 'SILVER' 
                ELSE 'BRONZE' 
              END 
            WHEN score = 0 THEN 'BRONZE' 
            WHEN rank BETWEEN 1 AND total_count * 0.06 THEN 'DIAMOND' 
            WHEN rank BETWEEN total_count * 0.06 + 1 AND total_count * 0.12 THEN 'PLATINUM' 
            WHEN rank BETWEEN total_count * 0.12 + 1 AND total_count * 0.30 THEN 'GOLD' 
            WHEN rank BETWEEN total_count * 0.30 + 1 AND total_count * 0.50 THEN 'SILVER' 
            ELSE 'BRONZE' 
          END AS tier, 
          nickname, 
          score 
          FROM ranked_members 
      ),
      ranked_tiers AS (
        SELECT 
          ROW_NUMBER() OVER (ORDER BY score DESC) AS new_rank, 
          tier, 
          nickname, 
          score 
        FROM ranked_with_tiers 
        WHERE tier = $1 
      )
      SELECT *
      FROM ranked_tiers 
      WHERE new_rank > $2 
      ORDER BY new_rank 
      LIMIT 10;
      `,
        [sortType, current],
      )
    ).rows
  }
}
