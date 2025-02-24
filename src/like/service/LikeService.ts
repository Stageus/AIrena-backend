import { UUID } from 'crypto'

export class LikeService {
  static async addLikeToArticle(memberIdx: number, path: UUID): Promise<void> {
    // TODO: Implement like addition logic
  }

  static async deleteLikeFromArticle(
    memberIdx: number,
    path: UUID,
  ): Promise<void> {
    // TODO: Implement like deletion logic
  }
}

export default LikeService
