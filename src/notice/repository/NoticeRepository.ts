import { postgres } from '#config/postgres'
import { UUID } from 'crypto'

export default class NoticeRepository {
  static async getListFromDb(currentPage: number, offset: number) {
    return await postgres.query('SELECT * FROM notice WHERE ')
  }
  static async getSearchListFromDb(title: string) {
    return await postgres.query('SELECT * FROM notice WHERE title = $1', [
      title,
    ])
  }
  static async insertNoticeToDb(
    memberIdx: number,
    title: string,
    content: string,
    image: string[],
  ) {
    return (
      await postgres.query(
        'INSERT INTO notice (memberIdx, title, content, image) WHERE ($1,$2) RETURNING idx',
        [memberIdx, title, content, image],
      )
    ).rows[0].idx
  }
  static async getNoticeInfoFromDb(idx: UUID) {
    return (await postgres.query('SELECT * FROM notice WHERE idx = $1', [idx]))
      .rows[0]
  }
  static async deleteNoticeFromDb(idx: UUID) {
    return await postgres.query('DELETE FROM notice WHRER idx = $1', [idx])
  }
  static async editNoticeFromDb(
    idx: UUID,
    title: string,
    content: string,
    image: string[],
  ) {
    return await postgres.query(
      'UPDATE notice SET title = $1, content = $2, image = $3 WHERE idx = $4',
      [title, content, image, idx],
    )
  }
}
