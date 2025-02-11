import controller from '#controller'
import FindPasswordRequest from '#dto/frontend/request/FindPasswordRequest'
import PasswordChangeRequest from '#dto/frontend/request/PasswordChangeRequest'
import SignupRequest from '#dto/frontend/request/SignupRequest'
import SignupVerifyRequest from '#dto/frontend/request/SignupVerifyRequest'
import MemberService from '#service/MemberService'
import express, { Request, Response } from 'express'

export const userRouter = express.Router()

/** 회원가입 API */
userRouter.post(
  '/signup',
  controller(
    null,
    null,
    SignupRequest,
    null,
  )(async (req, res) => {
    // await MemberService.emailSend(req.body)
    const token = await MemberService.emailSend(req.body)
    // return res.send({
    //   token: token,
    // })
    return res.sendStatus(201)
  }),
)

/** 회원가입 인증 API */
userRouter.post(
  '/verify',
  controller(
    null,
    null,
    SignupVerifyRequest,
    null,
  )(async (req, res) => {
    await MemberService.userVerify(req.body) // 변수 이게 맞나?param으로 주면 이게 맞음 //query로 받으면 req.query 로로
    return res.sendStatus(201)
  }),
)

/** 닉네임 변경 API */
// userRouter.patch(
//   'change/nickname',
//   async (
//     req: Request<{}, {}, NicknameChangeRequest, {}>,
//     res: Response,
//   ): Promise<any> => {
//     await MemberService.nicknameChange(req.header, req.body)
//     return res.sendStatus(201)
//   },
// )

/** 비밀번호 찾기 API */
userRouter.post(
  '/find/password',
  async (
    req: Request<{}, {}, FindPasswordRequest, {}>,
    res: Response,
  ): Promise<any> => {
    await MemberService.findPassword(req.body)
    return res.sendStatus(201)
  },
)

userRouter.patch(
  '/change/password',
  controller(null, null, PasswordChangeRequest, null)(async (req, res) => {}),
)
