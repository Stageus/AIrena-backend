import controller from '#controller'
import express from 'express'
import SendVerifyEmailRequest from '../dao/frontend/request/SendVerifyEmailRequest.js'
import SignupRequest from '../dao/frontend/request/SignupRequest.js'
import SignupVerifyRequest from '../dao/frontend/request/SignupVerifyRequest.js'
import SignupService from '../service/SignupService.js'
export const signupRouter = express.Router()

/** 회원가입 API */
signupRouter.post(
  '/signup',
  controller(
    null,
    null,
    SignupRequest,
    null,
  )(async (req, res) => {
    /** dev */
    await SignupService.emailSend(req.body)
    return res.sendStatus(201)
  }),
)

/** 회원가입 인증 API */
signupRouter.post(
  '/signup/verify',
  controller(
    SignupVerifyRequest,
    null,
    null,
    null,
  )(async (req, res) => {
    const url = await SignupService.verifySignup(req.query)
    return res.redirect(url)
  }),
)

/** 회원가입 인증 이메일 재전송 API */
signupRouter.get(
  '/signup/email',
  controller(
    SendVerifyEmailRequest,
    null,
    null,
    null,
  )(async (req, res) => {
    await SignupService.sendVerifyEmail(req.query)
    return res.sendStatus(200)
  }),
)
