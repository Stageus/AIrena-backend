import MockList from 'src/mock/entity/dto/MockList.js'

export default class ListResponse {
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

  public static of(mockList: MockList): ListResponse {
    return new ListResponse(
      mockList.firstPageNumber,
      mockList.currentPageNumber,
      mockList.lastPageNumber,
      mockList.mocks,
    )
  }

  public static createEmpty(): ListResponse {
    return new ListResponse(1, 1, 1, [])
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
