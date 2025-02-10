export default interface GetLikeDescMockListResultFromDB {
  totalCount: number
  mocks: {
    idx: number
    title: string
    writerNickname: string
    createdAt: string
    likeCount: number
  }[]
}
