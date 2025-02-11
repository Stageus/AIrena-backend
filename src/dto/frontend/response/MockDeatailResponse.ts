import MockDetail from '#entity/MockDetail'

export default class MockDetailResponse {
  title: string
  description: string
  createdAt: string
  quizCount: number
  writerNickname: string
  images: string[]

  constructor(
    title: string,
    description: string,
    createdAt: string,
    quizCount: number,
    writerNickname: string,
    images: string[],
  ) {
    this.title = title
    this.description = description
    this.createdAt = createdAt
    this.quizCount = quizCount
    this.writerNickname = writerNickname
    this.images = images
  }

  static of(mockDetail: MockDetail) {
    return new MockDetailResponse(
      mockDetail.title,
      mockDetail.description,
      mockDetail.createdAt,
      mockDetail.quizCount,
      mockDetail.writerNickname,
      mockDetail.images,
    )
  }
}
