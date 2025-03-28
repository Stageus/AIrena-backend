import controller from '#controller'
import express from 'express'
import LoginRequest from '../entity/dao/frontend/request/LoginRequest.js'
import NormalLoginRequest from '../entity/dao/frontend/request/NormalLoginRequest.js'
import LoginUserDataResponse from '../entity/dao/frontend/response/loginUserDataResponse.js'
import LoginService from '../service/LoginService.js'
export const loginRouter = express.Router()

const kakaoOauthUri = process.env.KAKAO_OAUTH_URI
const kakaoClientId = process.env.KAKAO_CLIENT_ID
const kakaoRedirectUri = process.env.KAKAO_REDIRECT_URI
const kakaoResponseType = process.env.KAKAO_RESPONSE_TYPE
const googleOauthUri = process.env.GOOGLE_OAUTH_URI
const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI

// 로그인 API
/** 일반 로그인 */
loginRouter.post(
  '/normal',
  controller(
    'every',
    null,
    null,
    NormalLoginRequest,
    null,
  )(async (req, res) => {
    await LoginService.attemptNormalLogin(req.body, res)
    res.sendStatus(200)
  }),
)

/** 카카오 로그인 */
loginRouter.get(
  '/kakao',
  controller(
    'every',
    null,
    null,
    null,
    null,
  )(async (req, res) => {
    return res.redirect(
      `${kakaoOauthUri}authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=${kakaoResponseType}`,
    )
  }),
)
loginRouter.get(
  '/kakao/redirect',
  controller(
    'every',
    LoginRequest,
    null,
    null,
    null,
  )(async (req, res) => {
    const url = await LoginService.checkKakaoUserDataAndSignin(
      req.query.code,
      res,
    )
    return res.redirect(url)
  }),
)

/** 구글 로그인 */
loginRouter.get(
  '/google',
  controller(
    'every',
    null,
    null,
    null,
    null,
  )(async (req, res) => {
    return res.redirect(
      `${googleOauthUri}?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=email profile`,
    )
  }),
)
loginRouter.get(
  '/google/redirect',
  controller(
    'every',
    LoginRequest,
    null,
    null,
    LoginUserDataResponse,
  )(async (req, res): Promise<any> => {
    const url = await LoginService.checkGoogleUserDataAndSignin(
      req.query.code,
      res,
    )
    return res.redirect(url)
  }),
)

/** 로그인 상태 확인 API */
loginRouter.get(
  '/check',
  controller(
    'login',
    null,
    null,
    null,
    null,
  )(async (req, res) => {
    return res.sendStatus(200)
  }),
)
