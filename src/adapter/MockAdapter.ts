import Mock from '#entity/Mock'
import Quiz from '#entity/Quiz'
import MockRepository from '#repository/MockRepository'

export default class MockAdapter {
  static async insertMockData(memberIdx: number, mock: Mock, quizzes: Quiz[]) {
    await MockRepository.insertMockData(
      memberIdx,
      mock.idx,
      mock.title,
      mock.description,
      mock.quizCount,
      quizzes,
    )
  }
}
