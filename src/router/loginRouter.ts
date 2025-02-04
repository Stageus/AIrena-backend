import asyncify from 'express-asyncify'
import dotenv from 'dotenv'
import LoginService from '#service/loginService'
import LoginRequest from '#dto/request/loginRequest'
import express, { Request, Response } from 'express'
import LoginUserDataResponse from '#dto/response/loginUserDataResponse'
dotenv.config()

const kakaoOauthUri = process.env.KAKAO_OAUTH_URI
const kakaoClientId = process.env.KAKAO_CLIENT_ID
const kakaoRedirectUri = process.env.KAKAO_REDIRECT_URI
const kakaoResponseType = process.env.KAKAO_RESPONSE_TYPE
const googleOauthUri = process.env.GOOGLE_OAUTH_URI
const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI

export const loginRouter = asyncify(express.Router())

loginRouter.get('/kakao', async (req: Request, res: Response) => {
  return res.redirect(
    `${kakaoOauthUri}authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=${kakaoResponseType}`,
  )
})

loginRouter.get(
  '/kakao/redirect',
  async (
    req: Request<{}, {}, {}, LoginRequest>,
    res: Response<LoginUserDataResponse>,
  ): Promise<any> => {
    return res.send(await LoginService.getKakaoUserData(req.query.code))
  },
)

loginRouter.get('/google', async (req: Request, res: Response) => {
  return res.redirect(
    `${googleOauthUri}?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=email profile`,
  )
})

loginRouter.get(
  '/google/redirect',
  async (
    req: Request<{}, {}, {}, LoginRequest>,
    res: Response<LoginUserDataResponse>,
  ): Promise<any> => {
    return res.send(await LoginService.getGoogleUserData(req.query.code))
  },
)
