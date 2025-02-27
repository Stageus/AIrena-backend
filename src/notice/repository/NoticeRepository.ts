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
        mem.nickname AS "writerNickname",
        notice.created_at AS "createdAt"
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
      await postgres.query(
        `SELECT COUNT(*) AS "totalCount" FROM notice WHERE is_deleted = 'f'`,
      )
    ).rows[0].totalCount
    return {
      listResult,
      totalCountResult,
    }
  }
  static async getSearchListFromDb(
    titleToSearch: string,
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
        WHERE notice.is_deleted = 'f' AND title LIKE $1
        ORDER BY 4 DESC
        LIMIT $2 OFFSET $3
        `,
        [titleToSearch, display, offset],
      )
    ).rows
    const totalCountResult = (
      await postgres.query(
        `SELECT COUNT(*) AS "totalCount" FROM notice WHERE is_deleted = 'f' AND title LIKE $1`,
        [titleToSearch],
      )
    ).rows[0].totalCount
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
    try {
      await postgres.query('BEGIN')
      const noticeResult = await postgres.query(
        `
        WITH notice_insert AS (
          INSERT INTO notice (member_idx, title, content, created_at)
          VALUES($1, $2, $3, NOW())
          RETURNING idx
        )
        INSERT INTO image (article_idx, urls, created_at)
        SELECT idx, $4, NOW() FROM notice_insert
        RETURNING article_idx`,
        [memberIdx, title, content, uploadUrls],
      )
      await postgres.query('COMMIT')
      const noticeIdx = noticeResult.rows[0].article_idx
      return noticeIdx
    } catch (err) {
      console.log(err)
      await postgres.query('ROLLBACK')
      throw ErrorRegistry.INTERNAL_SERVER_ERROR
    }
  }

  static async getNoticeInfoFromDb(idx: UUID) {
    return (
      await postgres.query(
        `SELECT n.title,
          mem.nickname AS "writerNickname",
          n.content,
          n.created_at AS "createdAt",
          i.urls AS "images"  
        FROM notice AS n 
        LEFT JOIN image AS i ON n.idx = i.article_idx 
        JOIN member AS mem ON mem.idx = n.member_idx
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
    await postgres.query(
      `
        WITH updated_notice AS(
          UPDATE notice 
          SET title = $1, content = $2
          WHERE is_deleted = 'f' AND idx = $3
          RETURNING idx
        )
        UPDATE image
        SET urls = $4
        WHERE article_idx IN(SELECT idx FROM updated_notice)
        `,
      [title, content, idx, uploadUrls],
    )
  }
}
