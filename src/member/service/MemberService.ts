import dotenv from 'dotenv'
import { Response } from 'express'

dotenv.config()

const signupRedirectUrl = `${process.env.FRONTEND_SERVER_URL}/redirect/signup`
const loginRedirectUrl = `${process.env.FRONTEND_SERVER_URL}/redirect/login`

export default class MemberService {
  /** 로그아웃 */
  static async logout(res: Response) {
    res.clearCookie('loginToken')
  }
}
