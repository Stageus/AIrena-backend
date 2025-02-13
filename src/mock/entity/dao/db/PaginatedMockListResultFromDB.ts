export default interface PaginatedMockListResultFromDB {
  totalCount: number
  mocks: {
    idx: number
    title: string
    writerNickname: string
    createdAt: string
    likeCount: number
  }[]
}
