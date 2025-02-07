import FindPasswordRequest from '#dto/request/FindPasswordRequest'
import SignupRequest from '#dto/request/SignupRequest'
import UserService from '#service/UserService'
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
    await UserService.signup(req.body)
    return res.sendStatus(201)
  },
)

userRouter.post(
  '/find/password',
  async (
    req: Request<{}, {}, FindPasswordRequest, {}>,
    res: Response,
  ): Promise<any> => {
    await UserService.findPassword(req.body)
    // return res.sendStatus(201)
    return res.send({
      message: '성공',
    })
  },
)
