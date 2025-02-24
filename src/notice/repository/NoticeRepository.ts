import { postgres } from '#config/postgres'
import { UUID } from 'crypto'

export default class NoticeRepository {
  static async getListFromDb(current: number, display: number) {
    console.log(current)
    console.log(display)
    // return await postgres
    //   .query(
    //     'SELECT title, member_idx, created_at FROM notice ORDER BY created_at DESC LIMIT $1 OFFSET $2',
    //     [display, current],
    //   )
    //   .catch((err) => {
    //     console.error(err)
    //     console.log(err)
    //   })
    return await postgres.query('SELECT * FROM notice')
  }
  static async getSearchListFromDb(title: string) {
    return (
      await postgres.query(
        "SELECT * FROM notice WHERE title = $1 AND is_deleted = 'f' ORDER BY created_at",
        [title],
      )
    ).rows[0]
  }
  static async insertNoticeToDb(
    memberIdx: number,
    title: string,
    content: string,
    uploadUrls: string[],
  ) {
    const noticeResult = await postgres.query(
      `INSERT INTO notice (member_idx, title, content, created_at)
         VALUES($1, $2, $3, NOW())
         RETURNING idx`,
      [memberIdx, title, content],
    )
    const noticeIdx = noticeResult.rows[0].idx

    await postgres.query(
      `INSERT INTO image (article_idx, urls, created_at)
          VALUES($1, $2, NOW())`,
      [noticeIdx, uploadUrls],
    )

    await postgres.query('COMMIT') // 트랜잭션 커밋

    return noticeIdx
  }

  static async getNoticeInfoFromDb(idx: UUID) {
    return (
      await postgres.query(
        'SELECT n.*, i.urls AS images FROM notice AS n LEFT JOIN image AS i on n.idx = i.article_idx WHERE n.idx = $1',
        [idx],
      )
    ).rows[0]
  }
  static async deleteNoticeFromDb(idx: UUID) {
    return await postgres.query(
      "UPDATE notice SET is_deleted = 't' WHERE idx = $1 AND is_deleted = 'f'",
      [idx],
    )
  }

  static async editNoticeFromDb(
    idx: UUID,
    title: string,
    content: string,
    uploadUrls: string | string[] | null | undefined, // uploadUrls는 null 또는 undefined일 수 있음
  ) {
    return await postgres.query()
  }
}
