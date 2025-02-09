import { postgres } from '#core/config/database/postgres'
import Quiz from '#entity/Quiz'
import { UUID } from 'crypto'

export default class MockRepository {
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
