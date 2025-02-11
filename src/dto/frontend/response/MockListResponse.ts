import MockList from '#entity/MockList'

export default class MockListResponse {
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

  public static of(mockList: MockList): MockListResponse {
    return new MockListResponse(
      mockList.firstPageNumber,
      mockList.currentPageNumber,
      mockList.lastPageNumber,
      mockList.mocks,
    )
  }

  public static createEmpty(): MockListResponse {
    return new MockListResponse(1, 1, 1, [])
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
    this.firstPageNumber = firstPageNumber
    this.currentPageNumber = currentPageNumber
    this.lastPageNumber = lastPageNumber
    this.mocks = mocks
  }
}
