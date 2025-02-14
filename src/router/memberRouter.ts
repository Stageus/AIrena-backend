import controller from '#controller'
import FindPasswordRequest from '#dto/frontend/request/FindPasswordRequest'
import NicknameChangeRequest from '#dto/frontend/request/NicknameChangeRequest'
import NormalLoginRequest from '#dto/frontend/request/NormalLoginRequest'
import PasswordChangeRequest from '#dto/frontend/request/PasswordChangeRequest'

import SignupRequest from '#dto/frontend/request/SignupRequest'
import EmailVerifyRequest from '#dto/frontend/request/SignupVerifyRequest'
import MemberService from '#service/MemberService'
import express, { Request, Response } from 'express'
import RandomNicknameGenerator from '../nickname/randomNicknameGenerator.js'
export const memberRouter = express.Router()

/** 회원가입 API */
memberRouter.post(
  '/signup',
  controller(
    null,
    null,
    SignupRequest,
    null,
  )(async (req, res) => {
    /** dev */
    const result: any = await MemberService.emailSend(req.body)
    return res.sendStatus(201)
  }),
)

/** 회원가입 인증 API */
memberRouter.post(
  '/signup/verify',
  controller(
    null,
    null,
    EmailVerifyRequest,
    null,
  )(async (req, res) => {
    await MemberService.verifySignup(req.body)
    return res.sendStatus(201)
  }),
)

/** 닉네임 변경 API */
memberRouter.patch(
  '/change/nickname',
  controller(
    null,
    null,
    NicknameChangeRequest,
    null,
  )(async (req, res): Promise<any> => {
    await MemberService.nicknameChange(req, req.body)
    return res.sendStatus(200)
  }),
)

/** 비밀번호 찾기 API */
memberRouter.post(
  '/find/password',
  controller(
    null,
    null,
    FindPasswordRequest,
    null,
  )(async (req, res): Promise<any> => {
    await MemberService.findPassword(req.body)
    return res.sendStatus(200)
  }),
)

/** 비밀번호 변경 API */
memberRouter.patch(
  '/change/password',
  controller(
    null,
    null,
    PasswordChangeRequest,
    null,
  )(async (req, res) => {
    await MemberService.changePassword(req, req.body)
    return res.sendStatus(200)
  }),
)

/** 로그인 API */
memberRouter.post(
  '/login/normal',
  controller(
    null,
    null,
    NormalLoginRequest,
    null,
  )(async (req, res) => {
    return res.send(await MemberService.attemptNormalLogin(req.body, res))
  }),
)

memberRouter.get('/test', async (req: Request, res: Response): Promise<any> => {
  const nickname = RandomNicknameGenerator.generateNickname() // 랜덤 생성기 자리
  return res.send({
    name: nickname,
  })
})

/** 인증 이메일 재전송 API */
memberRouter.get(
  '/send-email',
  controller(
    null,
    null,
    null,
    null,
  )(async (req, res) => {
    await MemberService.resendEmail(req)
    return res.sendStatus(200)
  }),
)

/** 로그인 상태 확인 API */
memberRouter.get(
  '/login/check',
  controller(
    null,
    null,
    null,
    null,
  )(async (req, res) => {
    await MemberService.checkLogin(req)
    return res.sendStatus(200)
  }),
)

/** 로그아웃 API */
memberRouter.get(
  '/logout',
  controller(
    null,
    null,
    null,
    null,
  )(async (req, res) => {
    await MemberService.logout(res)
    return res.sendStatus(200)
  }),
)
