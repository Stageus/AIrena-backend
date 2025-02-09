import FindPasswordRequest from '#dto/request/FindPasswordRequest'
import NicknameChangeRequest from '#dto/request/NicknameChangeRequest'
import SignupRequest from '#dto/request/SignupRequest'
import SignupVerifyRequest from '#dto/request/SignupVerifyRequest'
import MemberService from '#service/MemberService'
import express, { Request, Response } from 'express'
import asyncify from 'express-asyncify'

export const userRouter = asyncify(express.Router())

/** 회원가입 API */
userRouter.post(
  '/signup',
  async (
    req: Request<{}, {}, SignupRequest, {}>,
    res: Response,
  ): Promise<any> => {
    // await MemberService.emailSend(req.body)
    const token = await MemberService.emailSend(req.body)
    return res.send({
      token: token,
    })
    return res.sendStatus(201)
  },
)

/** 회원가입 인증 API */
userRouter.post(
  '/verify',
  async (
    req: Request<{}, {}, SignupVerifyRequest, {}>,
    res: Response,
  ): Promise<any> => {
    await MemberService.userVerify(req.body) // 변수 이게 맞나?param으로 주면 이게 맞음 //query로 받으면 req.query 로로
    return res.sendStatus(201)
  },
)

/** 닉네임 변경 API */
userRouter.patch(
  'change/nickname',
  async (
    req: Request<{}, {}, NicknameChangeRequest, {}>,
    res: Response,
  ): Promise<any> => {
    await MemberService.nicknameChange(req.body)
    return res.sendStatus(201)
  },
)

/** 비밀번호 변경 API */
userRouter.post(
  '/find/password',
  async (
    req: Request<{}, {}, FindPasswordRequest, {}>,
    res: Response,
  ): Promise<any> => {
    await MemberService.findPassword(req.body)
    // return res.sendStatus(201)
    return res.send({
      message: '성공',
    })
  },
)
