import MockDetail from '#entity/MockDetail'

export default class DetailResponse {
  title: string
  description: string
  createdAt: string
  quizCount: number
  writerNickname: string
  images: string[]

  static of(mockDetail: MockDetail): DetailResponse {
    return new DetailResponse(
      mockDetail.title,
      mockDetail.description,
      mockDetail.createdAt,
      mockDetail.quizCount,
      mockDetail.writerNickname,
      mockDetail.images,
    )
  }

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
}
