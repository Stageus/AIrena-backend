import { postgres } from '#config/postgres'

export default class MemberLoginRepository {
  /** 로그인
   * 로그인 계정 데이터를 가져옵니다. */
  static async getNormalLoginData(id: string, password: string) {
    return (
      await postgres.query(
        'SELECT * FROM member WHERE id = $1 AND password = $2',
        [id, password],
      )
    ).rows[0]
  }

  /**소셜로그인
   * 계정 존재 여부 확인
   */
  static async checkMemberDataFromDb(socialId: string) {
    return await postgres.query('SELECT * FROM member WHERE id = $1', [
      socialId,
    ])
  }

  /** 카카오 소셜로그인 회원가입 */
  static async insertKakaoLoginMemberData(socialId: string, nickname: string) {
    let dateTime = new Date()
    await postgres
      .query(
        'INSERT INTO member (id, provider, password, email, nickname,created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          socialId,
          'KAKAO',
          socialId,
          `${socialId}@kakao.com`,
          nickname,
          dateTime,
        ],
      )
      .catch((err) => {
        console.log(err)
      })
  }

  /** 구글 소셜로그인 회원가입 */
  static async insertGoogleLoginMemberData(
    socialId: string,
    nickname: string,
    email: string,
  ) {
    let dateTime = new Date()
    await postgres
      .query(
        'INSERT INTO member (id, provider, password, email, nickname,created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [socialId, 'GOOGLE', socialId, email, nickname, dateTime],
      )
      .catch((err) => {
        console.log(err)
      })
  }
}
