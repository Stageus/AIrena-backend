import { postgres } from '#config/postgres'
import { UUID } from 'crypto'
import IndividualMockDetailResultFromDB from '../entity/dao/db/IndividualMockDetailResultFromDB.js'
import MockResultFromDB from '../entity/dao/db/MockResultFromDB.js'
import PaginatedMockListResultFromDB from '../entity/dao/db/PaginatedMockListResultFromDB.js'
import Quiz from '../entity/dto/Quiz.js'

export default class MockRepository {
  static async getMock(idx: UUID) {
    return (
      await postgres.query(
        `
        WITH first_score AS (
          SELECT DISTINCT ON (mc.member_idx)
                mc.member_idx,
                m.nickname,
                mc.score
          FROM mock_score mc
          JOIN member m ON mc.member_idx = m.idx
          WHERE mc.mock_idx = $1
          ORDER BY mc.member_idx, mc.created_at ASC
        ),
        mock_rank AS (
          SELECT
            RANK() OVER (ORDER BY score DESC) AS "rank",
            nickname,
            score
          FROM first_score
          ORDER BY score DESC
          LIMIT 15
        ),
        like_count AS (
          SELECT COUNT(*)::integer as count FROM like_history
          WHERE article_idx = $1
        )
        SELECT
            mock.idx,
            mock.title,
            mock.description,
            TO_CHAR(mock.created_at,'YYYY-MM-DD' )as "createdAt",
            mock.quiz_count as "quizCount",
            like_count.count as "likeCount",
            member.nickname as "writerNickname",
            image.urls as images,
            (
                SELECT quiz.idx
                FROM quiz
                WHERE quiz.mock_idx = mock.idx
                ORDER BY quiz.created_at ASC
                LIMIT 1
            ) AS "firstQuizIdx",
            COALESCE(
              (
                SELECT json_agg(
                  json_build_object(
                  'rank', mr.rank,
                  'nickname', mr.nickname,
                  'score', mr.score
                  )
                )
                FROM mock_rank mr
              ),
            '[]'::json
            ) AS "ranks"
        FROM mock
        JOIN member ON member.idx = mock.member_idx
        JOIN image ON image.article_idx = mock.idx,
        like_count
        WHERE mock.idx = $1 AND mock.is_deleted = false
        `,
        [idx],
      )
    ).rows[0] as MockResultFromDB
  }

  static async getPaginatedMockList(displayCount: number, offset: number) {
    return (
      await postgres.query(
        `
        WITH total_mock AS (
            SELECT
                idx, 
                title, 
                member_idx,
                created_at
            FROM mock
            WHERE is_deleted = false
        ),
        new_paginated AS (
            SELECT *
            FROM total_mock
            ORDER BY created_at DESC
            LIMIT $1 OFFSET $2
        ),
        nickname_added AS (
            SELECT
                new_paginated.idx,
                new_paginated.title,
                TO_CHAR(new_paginated.created_at,'YYYY-MM-DD') as "createdAt",
                member.nickname as "writerNickname",
                (SELECT COUNT(*) FROM like_history lh WHERE lh.article_idx = new_paginated.idx) AS "likeCount"
            FROM new_paginated
            JOIN member ON member.idx = new_paginated.member_idx
        )
        SELECT json_build_object(
            'totalCount', (SELECT COUNT(*) FROM total_mock),
            'mocks', (
              SELECT json_agg(p ORDER BY p."createdAt" DESC) 
              FROM nickname_added as p
            )
        )
        `,
        [displayCount, offset],
      )
    ).rows[0].json_build_object as PaginatedMockListResultFromDB
  }

  static async getFilteredLikeDescMockList(
    titleToSearch: string,
    displayCount: number,
    offset: number,
  ) {
    return (
      await postgres.query(
        `
        WITH filtered AS (
            SELECT
                idx, 
                title, 
                member_idx,
                created_at
            FROM mock
            WHERE title LIKE $1 AND is_deleted = false
        ),
        like_count_paginated AS (
            SELECT *
            FROM filtered
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3
        ),
        nickname_added AS (
            SELECT
                like_count_paginated.idx,
                like_count_paginated.title,
                TO_CHAR(like_count_paginated.created_at,'YYYY-MM-DD') as "createdAt",
                member.nickname as "writerNickname",
                (SELECT COUNT(*) FROM like_history lc WHERE lc.article_idx = like_count_paginated.idx) AS "likeCount"
            FROM like_count_paginated
            JOIN member ON member.idx = like_count_paginated.member_idx
        )
        SELECT json_build_object(
          'totalCount', (SELECT COUNT(*) FROM filtered),
          'mocks', (
            SELECT json_agg(p ORDER BY p."likeCount" DESC)
            FROM nickname_added as p
          )
        );
        `,
        [titleToSearch, displayCount, offset],
      )
    ).rows[0].json_build_object as PaginatedMockListResultFromDB
  }

  static async getFilteredNewMockList(
    titleToSearch: string,
    displayCount: number,
    offset: number,
  ) {
    return (
      await postgres.query(
        `
        WITH filtered AS (
            SELECT
                idx, 
                title, 
                member_idx,
                created_at
            FROM mock
            WHERE title LIKE $1 AND is_deleted = false
        ),
        new_paginated AS (
            SELECT *
            FROM filtered
            ORDER BY created_at DESC
            LIMIT $2 OFFSET $3
        ),
        nickname_added AS (
            SELECT
                new_paginated.idx,
                new_paginated.title,
                TO_CHAR(new_paginated.created_at,'YYYY-MM-DD') as "createdAt",
                member.nickname as "writerNickname",
                (SELECT COUNT(*) FROM like_history lh WHERE lh.article_idx = new_paginated.idx) AS "likeCount"
            FROM new_paginated
            JOIN member ON member.idx = new_paginated.member_idx
        )
        SELECT json_build_object(
            'totalCount', (SELECT COUNT(*) FROM filtered),
            'mocks', (
              SELECT json_agg(p ORDER BY p."createdAt" DESC) 
              FROM nickname_added as p
            )
        )
        `,
        [titleToSearch, displayCount, offset],
      )
    ).rows[0].json_build_object as PaginatedMockListResultFromDB
  }

  static async insertMockData(
    memberIdx: number,
    title: string,
    description: string,
    quizCount: number,
    quizzes: Quiz[],
    urls: string[],
  ) {
    return (
      await postgres.query(
        `
        ${makeInsertManyQuery(quizzes.length)}
      `,
        [
          memberIdx,
          title,
          description,
          quizCount,
          urls,
          ...quizzes.flatMap((quiz) => [
            quiz.type,
            quiz.title,
            quiz.description,
            quiz.singleChoiceChoices,
            quiz.singleChoiceCorrectAnswer,
            quiz.textCorrectAnswer,
            quiz.reason,
          ]),
        ],
      )
    ).rows[0].mock_idx as UUID
  }

  static async getIndividualMockDetail(memberIdx: number, idx: UUID) {
    return (
      await postgres.query(
        `
      WITH push_like AS(
        SELECT
          1
        FROM like_history
        WHERE member_idx = $1 AND article_idx = $2
      ),
      solved AS(
        SELECT
          1
        FROM mock_score
        WHERE member_idx = $1 AND mock_idx = $2
      ),
      owner AS(
        SELECT 1
        FROM mock
        WHERE mock.idx = $2 AND mock.member_idx = $1
      ),
      admin AS(
        SELECT 1
        FROM member
        WHERE member.idx = $1 AND member.role = 'ADMIN'
      )
      SELECT 
        EXISTS (SELECT 1 FROM owner) AS owner,
        EXISTS (SELECT 1 FROM admin) AS admin,
        EXISTS (SELECT 1 FROM solved) AS solved,
        EXISTS (SELECT 1 FROM push_like) AS "pushLike"
      `,
        [memberIdx, idx],
      )
    ).rows[0] as IndividualMockDetailResultFromDB
  }

  static async updateMock(
    memberIdx: number,
    idx: UUID,
    title: string,
    description: string,
    urls: string[],
  ) {
    return await postgres.query(
      `
      WITH mock_update AS (
        UPDATE mock
        SET
          title = $3,
          description = $4,
          updated_at = NOW()
        FROM member
        WHERE mock.idx = $2 
            AND member.idx = $1
            AND (mock.member_idx = $1 OR member.role = 'ADMIN')
        RETURNING 1
      )
      UPDATE image SET urls = $5 WHERE article_idx = $2 AND EXISTS (SELECT 1 FROM mock_update)
      `,
      [memberIdx, idx, title, description, urls],
    )
  }

  static async deleteMock(memberIdx: number, idx: UUID) {
    return await postgres.query(
      `UPDATE mock 
      SET is_deleted = true
      FROM member
      WHERE mock.idx = $2 
        AND member.idx = $1
        AND (mock.member_idx = $1 OR member.role = 'ADMIN')`,
      [memberIdx, idx],
    )
  }
}
const makeInsertManyQuery = (quizzesLength: number) => {
  let lastIndex = 5
  return `
    WITH mock_insert AS(
      INSERT INTO mock (member_idx, title, description, quiz_count, created_at)
      VALUES($1, $2, $3, $4, NOW())
      RETURNING idx
    ),
    image_insert AS(
      INSERT INTO image (article_idx, urls, created_at)
      VALUES((SELECT idx FROM mock_insert), $5, NOW())
    )
    INSERT INTO quiz (
      mock_idx, 
      type, 
      title,
      description, 
      single_choice_choices, 
      single_choice_correct_answer, 
      text_correct_answer,
      reason,
      created_at
    )
    SELECT
      mi.idx,
      v.type,
      v.title,
      v.description,
      v.single_choice_choices,
      v.single_choice_correct_answer,
      v.text_correct_answer,
      v.reason,
      NOW() + (v.index * interval '1 millisecond')
    FROM mock_insert mi
    CROSS JOIN(
      VALUES
    ${Array.from({ length: quizzesLength }, (_, i) => {
      return `(
        $${++lastIndex}::choice_type, 
        $${++lastIndex}, 
        $${++lastIndex}, 
        $${++lastIndex}::text[], 
        $${++lastIndex}::integer, 
        $${++lastIndex},
        $${++lastIndex},
        ${i}::integer
      )`
    }).join(',')})
    AS v(type, title, description, single_choice_choices, single_choice_correct_answer, text_correct_answer, reason, index)
    RETURNING mock_idx
  `
}
