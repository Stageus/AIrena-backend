export default class NoticeList {
  firstPageNumber: number
  currentPageNumber: number
  lastPageNumber: number
  prevPageExist: boolean
  nextPageExist: boolean
  notices: {
    idx: number
    title: string
    writerNickname: string
    createdAt: string
  }[]

  constructor(
    currentPageNumber: number,
    displayCount: number,
    totalCount: number,
    notices: {
      idx: number
      title: string
      writerNickname: string
      createdAt: string
      totalCount: number
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
    this.notices = notices
  }
}
