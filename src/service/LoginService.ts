import LoginAdapter from '#adapter/OAuthAdapter'
import LoginUserDataResponse from '#dto/frontend/response/loginUserDataResponse'
import MemberRepository from '#repository/MemberRepository'

const kakaoOauthUserInfoUrl = process.env.KAKAO_OAUTH_USER_INFO_URL || ''
const googleOauthUserInfoUrl = process.env.GOOGLE_OAUTH_USER_INFO_URL || ''

export default class LoginService {
  static async checkKakaoUserDataAndSignin(code: string) {
    const loginToken = await LoginAdapter.getKakaoToken(code)
    const userData = await LoginAdapter.getUserDataByToken(
      loginToken,
      kakaoOauthUserInfoUrl,
    )
    console.log(userData.id as string, '받아온 소셜 로그인 아이디')
    const checkResult: any = await MemberRepository.checkMemberDataFromDb(
      userData.id,
    )
    console.log(checkResult.rows[0], ' 결과 검색')
    if (!checkResult.rows[0] || checkResult.rows[0] == undefined) {
      console.log(userData.id as string, '소셜 아이디')
      console.log(userData.properties.nickname, '소셜 닉네임')
      await MemberRepository.insertKakaoLoginMember(
        userData.id as string,
        userData.properties.nickname,
      )
      console.log('회원가입함')
    }
    console.log('로그인 됨')
    return new LoginUserDataResponse(userData)
  }

  static async checkGoogleUserDataAndSignin(code: string) {
    const loginToken = await LoginAdapter.getGoogleToken(code)
    const userData = await LoginAdapter.getUserDataByToken(
      loginToken,
      googleOauthUserInfoUrl,
    )
    console.log(userData.id as string, '받아온 소셜 로그인 아이디')
    const checkResult: any = await MemberRepository.checkMemberDataFromDb(
      userData.id,
    )
    console.log(checkResult.rows[0], ' 결과 검색')
    if (!checkResult.rows[0] || checkResult.rows[0] == undefined) {
      console.log(userData.id as string, '소셜 아이디')
      console.log(userData.name, '소셜 닉네임')
      await MemberRepository.insertGoogleLoginMember(
        userData.id as string,
        userData.name,
        userData.email,
      )
      console.log('회원가입함')
    }
    console.log('로그인 됨')

    return new LoginUserDataResponse(userData)
  }
}
