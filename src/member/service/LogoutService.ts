import Token from '#util/token/index'
import { Response } from 'express'

export default class LogoutService {
  /** 로그아웃 */
  static async logout(res: Response) {
    Token.destroyCookie('loginToken', res)
  }
}
