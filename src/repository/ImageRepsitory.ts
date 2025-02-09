import { postgres } from '#core/config/database/postgres'
import { UUID } from 'crypto'

export default class ImageRepository {
  static async insertImage(articleIdx: UUID, urls: string[]) {
    await postgres.query(
      'INSERT INTO image (article_idx, urls, created_at) VALUES ($1, $2, NOW())',
      [articleIdx, urls],
    )
  }
}
