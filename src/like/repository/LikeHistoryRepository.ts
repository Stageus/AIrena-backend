import { postgres } from '#config/postgres'
import { UUID } from 'crypto'

export default class LikeHistoryRepository {
  static async addLikeHistory(
    memberIdx: number,
    articleIdx: UUID,
  ): Promise<void> {
    await postgres.query(
      `
      INSERT INTO like_history (member_idx, article_idx, created_at)
      VALUES ($1, $2, NOW())
    `,
      [memberIdx, articleIdx],
    )
  }

  static async deleteLikeHistory(
    memberIdx: number,
    articleIdx: UUID,
  ): Promise<void> {
    await postgres.query(
      `
      DELETE FROM like_history WHERE member_idx = $1 AND article_idx = $2
      `,
      [memberIdx, articleIdx],
    )
  }
}
