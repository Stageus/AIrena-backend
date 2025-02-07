import { postgres } from '#database/postgres'

export default class MemberRepository {
  static async insertMember(id: string, password: string, email: string) {
    await postgres.query(
      'INSERT INTO airena.member (id, password, email) VALUES ($1, $2, $3)',
      [id, password, email],
    )
  }
}
