import { postgres } from '#config/postgres'
import QuizResultFormDB from '#dto/db/QuizResultFormDB'
import { UUID } from 'crypto'

export default class QuizRepository {
  static async getMockQuizForMember(memberIdx: number, mockIdx: UUID) {
    return (
      await postgres.query(
        `
        WITH mock_quiz AS(
          SELECT
            *
          FROM quiz
          WHERE mock_idx = $1
        ),
        submit_count AS(
          SELECT count(*) as submit_count
          FROM answer_submit
          JOIN mock_quiz ON answer_submit.quiz_idx = mock_quiz.idx
          WHERE answer_submit.member_idx = $2
        )
        SELECT
          idx,
          title,
          type,
          description,
          single_choice_choices AS "singleChoiceChoices",
          single_choice_correct_answer AS "singleChoiceCorrectAnswer",
          text_correct_answer AS "textCorrectAnswer",
          reason,
          row_number AS "currentQuizIndex",
          total_quiz_count AS "totalQuizCount"
        FROM (
          SELECT
            mq.idx,
            mq.title,
            mq.type,
            mq.description,
            mq.single_choice_choices,
            mq.single_choice_correct_answer,
            mq.text_correct_answer,
            mq.reason,
            sc.submit_count,
            ROW_NUMBER() OVER (ORDER BY mq.created_at ASC) AS row_number,
            COUNT(*) OVER () AS total_quiz_count
          FROM mock_quiz mq
            CROSS JOIN submit_count sc
          ) t
        WHERE t.row_number > t.submit_count
        ORDER BY t.row_number ASC
        LIMIT 1;
        `,
        [mockIdx, memberIdx],
      )
    ).rows[0] as QuizResultFormDB
  }
}
