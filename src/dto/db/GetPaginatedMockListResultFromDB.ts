export default interface GetPaginatedMockListResultFromDB {
  totalCount: number
  mocks: {
    idx: number
    title: string
    writerNickname: string
    createdAt: string
    likeCount: number
  }[]
}
