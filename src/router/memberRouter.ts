import controller from '#core/controller/index'
import FindPasswordRequest from '#dto/request/FindPasswordRequest'
import NicknameChangeRequest from '#dto/request/NicknameChangeRequest'
import SignupRequest from '#dto/request/SignupRequest'
import EmailVerifyRequest from '#dto/request/SignupVerifyRequest'
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
    // await MemberService.emailSend(req.body)
    await MemberService.emailSend(req.body)
    // return res.send({
    //   token: token,
    // })
    return res.sendStatus(201)
  }),
)

/** 포스트맨 결과 값 받는 용 */
memberRouter.post(
  '/signup',
  async (
    req: Request<{}, {}, SignupRequest, {}>,
    res: Response,
  ): Promise<any> => {
    const token = await MemberService.emailSend(req.body)
    return res.send({
      token: token,
    })
    // return res.sendStatus(201)
  },
),
  /** 회원가입 인증 API */
  memberRouter.get(
    '/verify',
    controller(
      EmailVerifyRequest,
      null,
      null,
      null,
    )(async (req, res) => {
      await MemberService.verifySignup(req.query)
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
    return res.sendStatus(201)
  }),
)

/** 비밀번호 변경 API */
memberRouter.post(
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

memberRouter.get('/test', async (req: Request, res: Response): Promise<any> => {
  const nickname = RandomNicknameGenerator.generateNickname() // 랜덤 생성기 자리
  return res.send({
    name: nickname,
  })
})
