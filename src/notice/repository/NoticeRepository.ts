import { postgres } from '#config/postgres'
import ErrorRegistry from '#error/ErrorRegistry'
import { UUID } from 'crypto'

export default class NoticeRepository {
  static async getPagedListFromDb(display: number, offset: number) {
    const listResult = (
      await postgres.query(
        `
        SELECT notice.idx AS idx, 
        notice.title AS title, 
        mem.nickname AS writerNickname,
        notice.created_at AS createdAt
        FROM notice AS notice
        LEFT JOIN member AS mem ON notice.member_idx = mem.idx
        WHERE notice.is_deleted = 'f'
        ORDER BY 4 DESC
        LIMIT $1 OFFSET $2
        `,
        [display, offset],
      )
    ).rows
    const totalCountResult = (
      await postgres.query(`SELECT COUNT(*) AS totalCount FROM notice`)
    ).rows[0]
    await postgres.query('COMMIT')
    return {
      listResult,
      totalCountResult,
    }
  }
  static async getSearchListFromDb(
    title: string,
    display: number,
    offset: number,
  ) {
    const listResult = (
      await postgres.query(
        `
        SELECT notice.idx AS idx, 
        notice.title AS title, 
        mem.nickname AS writerNickname,
        notice.created_at AS createdAt
        FROM notice AS notice
        LEFT JOIN member AS mem ON notice.member_idx = mem.idx
        WHERE notice.is_deleted = 'f' AND title = $1
        ORDER BY 4 DESC
        LIMIT $2 OFFSET $3
        `,
        [title, display, offset],
      )
    ).rows
    const totalCountResult = (
      await postgres.query(`SELECT COUNT(*) AS totalCount FROM notice`)
    ).rows[0]
    return {
      listResult,
      totalCountResult,
    }
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
    return noticeIdx
  }

  static async getNoticeInfoFromDb(idx: UUID) {
    return (
      await postgres.query(
        `SELECT n.title,n.member_idx AS memberIdx,n.content,n.created_at AS createdAt, i.urls AS image 
        FROM notice AS n 
        LEFT JOIN image AS i on n.idx = i.article_idx 
        WHERE n.idx = $1 AND n.is_deleted = 'f'`,
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
    uploadUrls: string[], // uploadUrls는 null 또는 undefined일 수 있음
  ) {
    try {
      await postgres.query('BEGIN')
      await postgres.query(
        "UPDATE notice SET title = $1, content = $2 WHERE is_deleted = 'f' AND idx = $3",
        [title, content, idx],
      )
      await postgres.query(
        'UPDATE image SET urls = $1 WHERE article_idx = $2',
        [uploadUrls, idx],
      )
      await postgres.query('COMMIT')
    } catch (err) {
      await postgres.query('ROLLBACK')
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
  }
}
