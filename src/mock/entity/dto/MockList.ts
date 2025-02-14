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
