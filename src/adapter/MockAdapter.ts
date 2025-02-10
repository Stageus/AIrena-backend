import Mock from '#entity/Mock'
import MockList from '#entity/MockList'
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

  static async getNewMockFilteredList(
    currentPageNumber: number,
    displayCount: number,
    offset: number,
    titleToSearch: string,
  ): Promise<MockList> {
    const result = await MockRepository.getFilteredNewMockList(
      titleToSearch,
      displayCount,
      offset,
    )
    return MockList.from(currentPageNumber, displayCount, result)
  }

  static async getLikeDescMockFilteredList(
    currentPageNumber: number,
    displayCount: number,
    offset: number,
    titleToSearch: string,
  ): Promise<MockList> {
    const result = await MockRepository.getFilteredLikeDescMockList(
      titleToSearch,
      displayCount,
      offset,
    )
    return MockList.from(currentPageNumber, displayCount, result)
  }

  static async getMockList(
    currentPageNumber: number,
    displayCount: number,
    offset: number,
  ): Promise<MockList> {
    const result = await MockRepository.getPaginatedMockList(
      displayCount,
      offset,
    )
    return MockList.from(currentPageNumber, displayCount, result)
  }
}
