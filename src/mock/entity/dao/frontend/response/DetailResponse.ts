export default class DetailResponse {
  title: string
  description: string
  createdAt: string
  quizCount: number
  writerNickname: string
  images: string[]
  quizIdxes: number[]

  constructor(
    title: string,
    description: string,
    createdAt: string,
    quizCount: number,
    writerNickname: string,
    images: string[],
    quizIdxes: number[],
  ) {
    this.title = title
    this.description = description
    this.createdAt = createdAt
    this.quizCount = quizCount
    this.writerNickname = writerNickname
    this.images = images
    this.quizIdxes = quizIdxes
  }
}
