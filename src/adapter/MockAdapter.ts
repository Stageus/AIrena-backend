import Mock from '#entity/Mock'
import MockDetail from '#entity/MockDetail'
import MockList from '#entity/MockList'
import MockRepository from '#repository/MockRepository'
import { UUID } from 'crypto'

export default class MockAdapter {
  static async insertMockData(memberIdx: number, mock: Mock) {
    await MockRepository.insertMockData(
      memberIdx,
      mock.idx,
      mock.title,
      mock.description,
      mock.quizCount,
      mock.quizzes,
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

  static async getMockDetail(idx: UUID): Promise<MockDetail> {
    const result = await MockRepository.getMock(idx)
    return MockDetail.of(result)
  }
}
