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
    for (const url of uploadUrls) {
      await postgres.query(
        `INSERT INTO image (article_idx, urls, created_at)
           VALUES($1, $2, NOW())`,
        [noticeIdx, url],
      )
    }
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
    // uploadUrls가 null, undefined일 경우 빈 배열로 설정
    if (!uploadUrls) {
      uploadUrls = [] // 빈 배열로 설정
    } else if (typeof uploadUrls === 'string') {
      uploadUrls = [uploadUrls] // 단일 문자열을 배열로 변환
    }

    await postgres.query('BEGIN')
    try {
      // 이미지가 있을 경우 MERGE INTO로 처리
      await postgres.query(
        `MERGE INTO image AS i 
         USING (SELECT $4::uuid AS article_idx, $3 AS urls) AS v 
         ON i.article_idx = v.article_idx 
         WHEN MATCHED THEN UPDATE SET urls = v.urls 
         WHEN NOT MATCHED THEN INSERT (article_idx, urls, created_at) 
         VALUES (v.article_idx, v.urls, NOW());`,
        [title, content, uploadUrls, idx], // uploadUrls는 배열
      )

      // notice 테이블 업데이트
      await postgres.query(
        `UPDATE notice SET title = $1::text, content = $2::text WHERE idx = $3::uuid;`,
        [title, content, idx],
      )

      // 트랜잭션 커밋
      await postgres.query('COMMIT')
    } catch (error) {
      // 에러가 발생하면 롤백
      await postgres.query('ROLLBACK')
      throw error
    }
  }
}
