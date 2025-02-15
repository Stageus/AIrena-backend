import controller from '#controller'
import FindPasswordRequest from 'src/member/dao/frontend/request/FindPasswordRequest.js'
import NicknameChangeRequest from 'src/member/dao/frontend/request/NicknameChangeRequest.js'
import NormalLoginRequest from 'src/member/dao/frontend/request/NormalLoginRequest.js'
import PasswordChangeRequest from 'src/member/dao/frontend/request/PasswordChangeRequest.js'
import SendFindPasswordEmailRequest from 'src/member/dao/frontend/request/SendFindPasswordEmailRequest.js'
import SendVerifyEmailRequest from 'src/member/dao/frontend/request/SendVerifyEmailRequest.js'

import express from 'express'
import SignupRequest from 'src/member/dao/frontend/request/SignupRequest.js'
import {
  default as EmailVerifyRequest,
  default as SignupVerifyRequest,
} from 'src/member/dao/frontend/request/SignupVerifyRequest.js'
import MemberService from 'src/member/service/MemberService.js'
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
    await MemberService.emailSend(req.body)
    return res.sendStatus(201)
  }),
)

/** 회원가입 인증 API */
memberRouter.post(
  '/signup/verify',
  controller(
    SignupVerifyRequest,
    null,
    EmailVerifyRequest,
    null,
  )(async (req, res) => {
    const url = await MemberService.verifySignup(req.query)
    return res.redirect(url)
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
    const url = await MemberService.attemptNormalLogin(req.body, res)
    res.redirect(url)
  }),
)

/** 회원가입 인증 이메일 재전송 API */
memberRouter.get(
  '/signup/email',
  controller(
    SendVerifyEmailRequest,
    null,
    null,
    null,
  )(async (req, res) => {
    await MemberService.sendVerifyEmail(req.query)
    return res.sendStatus(200)
  }),
)

/** 비밀번호 찾기 인증 이메일 재전송 API */
memberRouter.get(
  '/change/password/email',
  controller(
    SendFindPasswordEmailRequest,
    null,
    null,
    null,
  )(async (req, res) => {
    await MemberService.sendPasswordFindEmail(req.query)
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
