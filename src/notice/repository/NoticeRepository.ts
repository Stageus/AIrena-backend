import { postgres } from '#config/postgres'

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
  ) {
    return (
      await postgres.query(
        'INSERT INTO notice (memberIdx, title,content) WHERE ($1,$2) RETURNING idx',
        [title, content],
      )
    ).rows[0].idx
  }
}
