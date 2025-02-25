import { postgres } from '#config/postgres'

export default class RankListRepository {
  static async getRankListFromDb(
    sortType: string,
    nicknameToSearch: string,
    rangeToGet: string,
  ) {
    return await postgres.query(`
      SELECT RANK() OVER(ORDER BY score DESC) AS rank,
      CASE 
        WHEN score BETWEEN 0 AND 6 THEN 'DIAMOND'
        WHEN score BETWEEN 6 AND 12 THEN 'PLATINUM'
        WHEN score BETWEEN 12 AND 30 THEN 'GOLD'
        WHEN score BETWEEN 30 AND 50 THEN 'SILVER'
        WHEN score BETWEEN 50 AND 100 THEN 'BRONZE'
      END AS tier,
      nickname,
      score
      FROM member
      WHERE rank < 10
      LIMIT 10

      `)
  }

  static async getFilteredRankListFromDb(nicknameToSearch: string) {
    return await postgres.query('SELECT * FROM member WHERE id = $1', [
      nicknameToSearch,
    ])
  }
}
