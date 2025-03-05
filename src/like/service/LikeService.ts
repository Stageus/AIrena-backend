import ErrorRegistry from '#error/ErrorRegistry'
import { UUID } from 'crypto'
import LikeHistoryRepository from '../repository/LikeHistoryRepository.js'

export class LikeService {
  static async addLikeToArticle(memberIdx: number, path: UUID): Promise<void> {
    try {
      await LikeHistoryRepository.addLikeHistory(memberIdx, path)
    } catch (e) {
      if (e instanceof Error && (e as any).code === '23505') {
        throw ErrorRegistry.DUPLICATE_LIKE
      } else {
        throw e
      }
    }
  }

  static async deleteLikeFromArticle(
    memberIdx: number,
    path: UUID,
  ): Promise<void> {
    await LikeHistoryRepository.deleteLikeHistory(memberIdx, path)
  }
}

export default LikeService
