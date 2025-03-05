import { postgres } from '#config/postgres'

export default class MemberChangeRepository {
  /** 입력받은 닉네임으로 닉네임을 변경합니다. */
  static async changeNickname(nickname: string, memberIdx: number) {
    await postgres
      .query('UPDATE member SET nickname = $1 WHERE idx = $2', [
        nickname,
        memberIdx,
      ])
      .catch((err) => {
        console.log(err)
      })
  }

  /** 비밀번호 변경
   * 비밀번호 값을 변경합니다. */
  static async updateMemberPassword(password: string, id: string) {
    return (
      await postgres.query('UPDATE member SET password = $1 WHERE id = $2', [
        password,
        id,
      ])
    ).rows[0]
  }
}
