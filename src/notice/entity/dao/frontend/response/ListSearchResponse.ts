import NoticeList from 'src/notice/entity/dto/NoticeList.js'
export default class NoticeSearchListResponse {
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

  public static of(noticeList: NoticeList): NoticeSearchListResponse {
    return new NoticeSearchListResponse(
      noticeList.firstPageNumber,
      noticeList.currentPageNumber,
      noticeList.lastPageNumber,
      noticeList.notices,
    )
  }

  public static createEmpty(): NoticeSearchListResponse {
    return new NoticeSearchListResponse(1, 1, 1, [])
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
