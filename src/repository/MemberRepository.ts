import { postgres } from '#database/postgres'

export default class MemberRepository {
  static async insertMember(id: string, password: string, email: string) {
    await postgres.query(
      'INSERT INTO member (id, provider, password, email, nickname) VALUES ($1, $2, $3, $4, $5)',
      [id, 'NORMAL', password, email, 'test1'],
    )
  }
}
