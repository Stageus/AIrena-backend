import controller from '#controller'
import dotenv from 'dotenv'
import express from 'express'
import NormalLoginRequest from '../entity/dao/frontend/request/NormalLoginRequest.js'
import LoginRequest from '../entity/dto/frontend/request/LoginRequest.js'
import LoginUserDataResponse from '../entity/dto/frontend/response/loginUserDataResponse.js'
import LoginService from '../service/LoginService.js'
export const loginRouter = express.Router()
dotenv.config()

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
    null,
    null,
    NormalLoginRequest,
    null,
  )(async (req, res) => {
    const url = await LoginService.attemptNormalLogin(req.body, res)
    console.log('로그인 됨')
    res.redirect(url)
  }),
)

/** 카카오 로그인 */
loginRouter.get(
  '/kakao',
  controller(
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
    null,
    null,
    null,
    null,
  )(async (req, res) => {
    await LoginService.checkLogin(req)
    return res.sendStatus(200)
  }),
)
