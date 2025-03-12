import { UUID } from 'crypto'

export interface NoticeListFromDB {
  totalCount: number
  list: {
    idx: UUID
    title: string
    writerNickname: string
    content: string
    createdAt: string
  }[]
}
