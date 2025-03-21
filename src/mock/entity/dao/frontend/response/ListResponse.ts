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

  constructor(
    currentPageNumber: number,
    displayCount: number,
    totalCount: number,
    mocks: {
      idx: number
      title: string
      writerNickname: string
      createdAt: string
      likeCount: number
    }[],
  ) {
    this.currentPageNumber = currentPageNumber
    this.firstPageNumber = Math.floor((currentPageNumber - 1) / 10) * 10 + 1
    const pageOffset = Math.min(
      9,
      Math.floor(
        (totalCount - (this.firstPageNumber - 1) * displayCount) / displayCount,
      ),
    )
    this.lastPageNumber = this.firstPageNumber + pageOffset
    this.prevPageExist = this.firstPageNumber > 1
    this.nextPageExist =
      this.lastPageNumber < Math.floor((totalCount - 1) / displayCount) + 1
    this.mocks = mocks
  }
}
