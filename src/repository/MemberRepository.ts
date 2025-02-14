import { postgres } from '#config/postgres'
import { redis } from '#config/redis'
import ErrorRegistry from '#error/ErrorRegistry'
export default class MemberRepository {
  /** 아이디 & 이메일 중복 체크 */
  static async checkIdAndEmailDuplicate(id: string, email: string) {
    const checkResult = await postgres.query(
      'SELECT CASE WHEN EXISTS(SELECT 1 FROM member WHERE id = $1) THEN $2 ELSE $3 END AS id_status, CASE WHEN EXISTS(SELECT 1 FROM member WHERE email = $4) THEN $5 ELSE $6 END AS email_status',
      [id, 'ID_EXIST', 'ID_NOT_EXIST', email, 'EMAIL_EXIST', 'EMAIL_NOT_EXIST'],
    )
    console.log(checkResult.rows[0].id_status)
    console.log(checkResult.rows[0].email_status)
    if ((checkResult.rows[0].id_status as any) === 'ID_EXIST') {
      throw ErrorRegistry.DUPLICATED_ID
    } else if ((checkResult.rows[0].email_status as any) === 'EMAIL_EXIST') {
      throw ErrorRegistry.DUPLICATED_EMAIL
    }
  }
  /** 회원 가입
   * 저장한 회원 정보를 DB에 저장합니다. */
  static async insertNormalMember(
    id: string,
    password: string,
    email: string,
    nickname: string,
  ) {
    let checkApprove = await redis.hget('email', 'is_approved')
    if (checkApprove != true) {
      let datetime = new Date()
      await postgres.query(
        'INSERT INTO member (id, provider, password, email, nickname,created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [id, 'NORMAL', password, email, nickname, datetime],
      )
    }
  }
  /** 이메일 인증
   * 인증 이메일 정보를 저장합니다.  */
  static async saveEmailInfo(email: string): Promise<void> {
    const now = new Date() // 현재 시간
    now.setHours(0, 0, 0, 0) // 현재 시간에서 다음날 00시로 설정
    console.log(now.setHours(24, 0, 0, 0))
    const expireTime = Math.floor(now.getTime() / 1000) // Unix 타임스탬프 (초 단위)
    await redis.hset(email, {
      send_count: 1,
    })
    await redis.expireat(email, expireTime)
  }

  /** 이메일 인증
   * redis에 해당 이메일이 있는지를 확인하여 인증합니다. */
  static async emailCheck(email: string) {
    let emailCheckResult = await redis.hget('email', 'is_approved')
    if (emailCheckResult == 'nil') {
      throw ErrorRegistry.ACCESS_DENIED
    }
    await redis.hset(email, {
      send_count: 1,
      is_approved: true,
    })
  }

  /** 인증 이메일 재전송
   *  이메일 전송 횟수를 증가 시킵니다. */
  static async increaseEmailCount() {
    await redis.hincrby('email', 'sendCount', 1)
  }

  /** 닉네임 변경
   * 입력받은 닉네임으로 변경합니다. */
  static async changeNickname(nickname: string, id: string) {
    await postgres.query('UPDATE member SET nickname = $1 WHERE id = $2', [
      nickname,
      id,
    ])
  }

  /** 비밀번호 찾기
   * 비밀번호 값을 찾아옵니다. 값 없을 때 예외 처리 해야함함 */
  static async getMemberPassword(id: string, email: string) {
    return (
      await postgres.query(
        'SELECT * FROM member WHERE id = $1 AND email = $2',
        [id, email],
      )
    ).rows[0].password
  }
  /** 유저 정보 탐색 */
  static async checkMemberPassword(id: string, email: string) {
    return await postgres.query(
      'SELECT 1 FROM member WHERE id = $1 AND email = $2',
      [id, email],
    )
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

  static async checkMemberDataFromDb(socialId: string) {
    return await postgres.query('SELECT * FROM member WHERE id = $1', [
      socialId,
    ])
  }
  static async insertKakaoLoginMember(socialId: string, nickname: string) {
    let dateTime = new Date()
    await postgres
      .query(
        'INSERT INTO member (id, provider, password, email, nickname,created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          socialId,
          'KAKAO',
          socialId,
          'KAKAOUSER@kakao.com',
          nickname,
          dateTime,
        ],
      )
      .catch((err) => {
        console.log(err)
      })
    console.log('푸쉬드')
  }
  static async insertGoogleLoginMember(
    socialId: string,
    nickname: string,
    email: string,
  ) {
    let dateTime = new Date()
    await postgres
      .query(
        'INSERT INTO member (id, provider, password, email, nickname,created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [socialId, 'KAKAO', socialId, email, nickname, dateTime],
      )
      .catch((err) => {
        console.log(err)
      })
    console.log('푸쉬드')
  }
}
