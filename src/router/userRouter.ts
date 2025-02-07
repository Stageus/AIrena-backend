import userService from '#service/userService'
import express, { Request, Response } from 'express'
import asyncify from 'express-asyncify'

export const userRouter = asyncify(express.Router())

/** 회원가입 API */
userRouter.post(
  '/signup',
  async (req: Request, res: Response): Promise<any> => {
    return await userService.signup(req, res)
  },
)
