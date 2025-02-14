import controller from '#controller'
import LoginRequest from '#dto/frontend/request/LoginRequest'
import LoginUserDataResponse from '#dto/frontend/response/loginUserDataResponse'
import LoginService from '#service/LoginService'
import dotenv from 'dotenv'
import express from 'express'
dotenv.config()

const kakaoOauthUri = process.env.KAKAO_OAUTH_URI
const kakaoClientId = process.env.KAKAO_CLIENT_ID
const kakaoRedirectUri = process.env.KAKAO_REDIRECT_URI
const kakaoResponseType = process.env.KAKAO_RESPONSE_TYPE
const googleOauthUri = process.env.GOOGLE_OAUTH_URI
const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI

export const loginRouter = express.Router()

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
