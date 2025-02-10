import dotenv from 'dotenv'
dotenv.config()

const kakaoOauthUri = process.env.KAKAO_OAUTH_URI as string
const kakaoClientId = process.env.KAKAO_CLIENT_ID as string
const kakaoRedirectUri = process.env.KAKAO_REDIRECT_URI as string
const googleClientId = process.env.GOOGLE_CLIENT_ID as string
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI as string
const googleOauthTokenUrl = process.env.GOOGLE_OAUTH_TOKEN_URL as string

export default class OAuthAdapter {
  /**code를 통해서 카카오 Oauth토큰을 요청 및 획득*/
  static async getKakaoToken(code: string): Promise<string> {
    const tokenResponse = await fetch(
      `${kakaoOauthUri}token?grant_type=authorization_code&client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&code=${code}`,
      {
        method: 'POST',
      },
    )
    return (await tokenResponse.json()).access_token
  }

  /**code를 통해서 구글 Oauth토큰을 요청 및 획득 */
  static async getGoogleToken(code: string): Promise<string> {
    const tokenResponse = await fetch(googleOauthTokenUrl, {
      method: 'POST',
      body: new URLSearchParams({
        code: code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: googleRedirectUri,
        grant_type: 'authorization_code',
      }),
    })
    return (await tokenResponse.json()).access_token
  }

  /**token을 통해서 카카오 혹은 구글 사용자 정보를 요청 및 획득 */
  static async getUserDataByToken(token: string, oauthUrl: string) {
    const userDataResponse = await fetch(oauthUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return await userDataResponse.json()
  }
}
