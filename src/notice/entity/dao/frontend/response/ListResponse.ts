import NoticeList from 'src/notice/entity/dto/NoticeList.js'

export default class NoticeListResponse {
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

  public static of(noticeList: NoticeList): NoticeListResponse {
    return new NoticeListResponse(
      noticeList.firstPageNumber,
      noticeList.currentPageNumber,
      noticeList.lastPageNumber,
      noticeList.notices,
    )
  }

  public static createEmpty(): NoticeListResponse {
    return new NoticeListResponse(1, 1, 1, [])
  }

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
    this.firstPageNumber = firstPageNumber
    this.currentPageNumber = currentPageNumber
    this.lastPageNumber = lastPageNumber
    this.notices = notices
  }
}
