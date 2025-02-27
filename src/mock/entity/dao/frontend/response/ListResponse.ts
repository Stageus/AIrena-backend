import MockList from 'src/mock/entity/dto/MockList.js'

export default class ListResponse {
  firstPageNumber: number
  currentPageNumber: number
  lastPageNumber: number
  prevPageExist: boolean
  nextPageExist: boolean
  mocks: {
    idx: number
    title: string
    writerNickname: string
    createdAt: string
    likeCount: number
  }[]

  public static createEmpty(): ListResponse {
    return new ListResponse(1, 1, 1, false, false, [])
  }

  constructor(
    firstPageNumber: number,
    currentPageNumber: number,
    lastPageNumber: number,
    prevPageExist: boolean,
    nextPageExist: boolean,
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
    this.prevPageExist = prevPageExist
    this.nextPageExist = nextPageExist
    this.mocks = mocks
  }

  static of(mockList: MockList): ListResponse {
    return new ListResponse(
      mockList.firstPageNumber,
      mockList.currentPageNumber,
      mockList.lastPageNumber,
      mockList.prevPageExist,
      mockList.nextPageExist,
      mockList.mocks,
    )
  }
}
