import { postgres } from '#config/postgres'
import MockResultFromDB from '#dto/db/MockResultFromDB'
import PaginatedMockListResultFromDB from '#dto/db/PaginatedMockListResultFromDB'
import Quiz from '#entity/Quiz'
import { UUID } from 'crypto'

export default class MockRepository {
  static async getMock(idx: UUID) {
    return (
      await postgres.query(
        `
        SELECT
            mock.idx,
            mock.title,
            mock.description,
            mock.created_at as "createdAt",
            mock.quiz_count as "quizCount",
            mock.like_count as "likeCount",
            member.nickname as "writerNickname",
            image.urls as images
        FROM mock
        JOIN member ON member.idx = mock.member_idx
        JOIN image ON image.article_idx = mock.idx
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
                created_at,
                like_count
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
                new_paginated.created_at as "createdAt",
                new_paginated.like_count as "likeCount",
                member.nickname as "writerNickname"
            FROM new_paginated
            JOIN member ON member.idx = new_paginated.member_idx
        )
        SELECT json_build_object(
            'totalCount', (SELECT COUNT(*) FROM total_mock),
            'mocks', (SELECT json_agg(p) 
            FROM nickname_added as p)
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
                created_at,
                like_count
            FROM mock
            WHERE title LIKE $1 AND is_deleted = false
        ),
        like_count_paginated AS (
            SELECT *
            FROM filtered
            ORDER BY like_count DESC
            LIMIT $2 OFFSET $3
        ),
        nickname_added AS (
            SELECT
                like_count_paginated.idx,
                like_count_paginated.title,
                like_count_paginated.like_count as "likeCount",
                like_count_paginated.created_at as "createdAt",
                member.nickname as "writerNickname"
            FROM like_count_paginated
            JOIN member ON member.idx = like_count_paginated.member_idx
        )
        SELECT json_build_object(
          'totalCount', (SELECT COUNT(*) FROM filtered),
          'mocks', (SELECT json_agg(p)
          FROM nickname_added as p)
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
                created_at,
                like_count
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
                new_paginated.created_at as "createdAt",
                new_paginated.like_count as "likeCount",
                member.nickname as writerNickname
            FROM new_paginated
            JOIN member ON member.idx = new_paginated.member_idx
        )
        SELECT json_build_object(
            'totalCount', (SELECT COUNT(*) FROM filtered),
            'mocks', (SELECT json_agg(p) 
            FROM nickname_added as p)
        )
        `,
        [titleToSearch, displayCount, offset],
      )
    ).rows[0].json_build_object as PaginatedMockListResultFromDB
  }

  static async insertMockData(
    memberIdx: number,
    mockIdx: UUID,
    title: string,
    description: string,
    quizCount: number,
    quizzes: Quiz[],
  ) {
    await postgres.query(
      `
      WITH mock_insert AS(
        INSERT INTO mock (idx, member_idx, title, description, quiz_count, created_at)
          VALUES($1, $2, $3, $4, $5, NOW())
      )
      ${makeInsertManyQuery(6, quizzes.length)}
      `,
      [
        mockIdx,
        memberIdx,
        title,
        description,
        quizCount,
        ...makeInsertManyValues(mockIdx, quizzes),
      ],
    )
  }
}

const makeInsertManyQuery = (startIndex: number, quizzesLength: number) => {
  const query = `
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
      VALUES
  `

  let currentIndex = startIndex
  const mockIdxIndex = startIndex
  const values = Array.from({ length: quizzesLength }, () => {
    return `(
        $${mockIdxIndex},
        $${++currentIndex}, 
        $${++currentIndex}, 
        $${++currentIndex}, 
        $${++currentIndex}, 
        $${++currentIndex}, 
        $${++currentIndex}, 
        $${++currentIndex}, 
        NOW()
      )`
  })

  return query + values.join(',') + ';'
}

const makeInsertManyValues = (mockIdx: UUID, quizzes: Quiz[]) => {
  return [
    mockIdx,
    ...quizzes.flatMap((quiz) => [
      quiz.type,
      quiz.title,
      quiz.description,
      quiz.choices,
      quiz.singleChoiceCorrectAnswer,
      quiz.textCorrectAnswer,
      quiz.reason,
    ]),
  ]
}
