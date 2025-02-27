import NoticeList from 'src/notice/entity/dto/NoticeList.js'

export default class NoticeListResponse {
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

  public static of(noticeList: NoticeList): NoticeListResponse {
    return new NoticeListResponse(
      noticeList.firstPageNumber,
      noticeList.currentPageNumber,
      noticeList.lastPageNumber,
      noticeList.prevPageExist,
      noticeList.nextPageExist,
      noticeList.notices,
    )
  }

  public static createEmpty(): NoticeListResponse {
    return new NoticeListResponse(1, 1, 1, false, false, [])
  }

  constructor(
    firstPageNumber: number,
    currentPageNumber: number,
    lastPageNumber: number,
    prevPageExist: boolean,
    nextPageExist: boolean,
    notices: {
      idx: number
      title: string
      writerNickname: string
      createdAt: string
    }[],
  ) {
    this.firstPageNumber = firstPageNumber
    this.currentPageNumber = currentPageNumber
    this.lastPageNumber = lastPageNumber
    this.prevPageExist = prevPageExist
    this.nextPageExist = nextPageExist
    this.notices = notices
  }
}
