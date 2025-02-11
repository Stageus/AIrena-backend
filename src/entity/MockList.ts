import GetLikeDescMockListResultFromDB from '#dto/db/PaginatedMockListResultFromDB'

export default class MockList {
  firstPageNumber: number
  currentPageNumber: number
  lastPageNumber: number
  mocks: {
    idx: number
    title: string
    writerNickname: string
    createdAt: string
    likeCount: number
  }[]

  static from(
    currentPageNumber: number,
    displayCount: number,
    dbResult: GetLikeDescMockListResultFromDB,
  ) {
    const totalCount = dbResult.totalCount

    const firstPageNumber = Math.floor(currentPageNumber / 10) * 10 + 1
    const pageOffset = Math.min(
      9,
      Math.floor((totalCount - firstPageNumber * displayCount) / displayCount),
    )
    const lastPageNumber = firstPageNumber + pageOffset

    return new MockList(
      firstPageNumber,
      currentPageNumber,
      lastPageNumber,
      dbResult.mocks,
    )
  }

  constructor(
    firstPageNumber: number,
    currentPageNumber: number,
    lastPageNumber: number,
    mocks: {
      idx: number
      title: string
      writerNickname: string
      createdAt: string
      likeCount: number
    }[],
  ) {
    this.firstPageNumber = Number(firstPageNumber)
    this.currentPageNumber = Number(currentPageNumber)
    this.lastPageNumber = Number(lastPageNumber)
    this.mocks = mocks
  }
}
