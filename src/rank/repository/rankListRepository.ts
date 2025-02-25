import { postgres } from '#config/postgres'

export default class RankListRepository {
  static async getRankListFromDb(
    sortType: string,
    nicknameToSearch: string,
    rangeToGet: string,
  ) {
    return await postgres.query('SELECT * FROM member')
  }

  static async getFilteredRankListFromDb(nicknameToSearch: string) {
    return await postgres.query('SELECT * FROM member WHERE id = $1', [
      nicknameToSearch,
    ])
  }
}
