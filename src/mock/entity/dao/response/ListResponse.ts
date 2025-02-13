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
