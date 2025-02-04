import LoginAdapter from '#adapter/oAuthAdapter'
import LoginUserDataResponse from '#dto/response/loginUserDataResponse'

const kakaoOauthUserInfoUrl = process.env.KAKAO_OAUTH_USER_INFO_URL || ''
const googleOauthUserInfoUrl = process.env.GOOGLE_OAUTH_USER_INFO_URL || ''

export default class LoginService {
  static async getKakaoUserData(code: string) {
    const loginToken = await LoginAdapter.getKakaoToken(code)
    const userData = await LoginAdapter.getUserDataByToken(
      loginToken,
      kakaoOauthUserInfoUrl,
    )
    return new LoginUserDataResponse(userData)
  }

  static async getGoogleUserData(code: string) {
    const loginToken = await LoginAdapter.getGoogleToken(code)
    const userData = await LoginAdapter.getUserDataByToken(
      loginToken,
      googleOauthUserInfoUrl,
    )
    return new LoginUserDataResponse(userData)
  }
}
