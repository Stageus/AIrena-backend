import Image from '#entity/Image'
import Mock from '#entity/Mock'
import Quiz from '#entity/Quiz'
import MockRepository from '#repository/MockRepository'

export default class MockAdapter {
  static async insertMockData(mock: Mock, image: Image, quizzes: Quiz[]) {
    MockRepository.insertMockData()
  }
}
