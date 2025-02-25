export default class MockList {
  firstPageNumber: number
  currentPageNumber: number
  lastPageNumber: number
  notices: {
    idx: number
    title: string
    writerNickname: string
    createdAt: string
    totalCount: number
  }[]

  constructor(
    firstPageNumber: number,
    currentPageNumber: number,
    lastPageNumber: number,
    notices: {
      idx: number
      title: string
      writerNickname: string
      createdAt: string
      totalCount: number
    }[],
  ) {
    this.firstPageNumber = Number(firstPageNumber)
    this.currentPageNumber = Number(currentPageNumber)
    this.lastPageNumber = Number(lastPageNumber)
    this.notices = notices
  }
}
