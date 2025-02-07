import { postgres } from '#database/postgres'
import CustomError from '#error/customError'
import { Request, Response } from 'express'

export default class userService {
  static async signup(req: Request, res: Response) {
    const { id, pw, email } = req.body
    const signUpResult = await postgres.query(
      'INSERT INTO airena_use.account (id, password, email) VALUES ($1, $2, $3)',
      [id, pw, email],
    )
    // .catch((err) => {
    //   console.log(err.stack)
    //   // throw new CustomError(err.statusCode, err.statusCode, err.stack)
    //   throw err
    // })
    if (signUpResult.rowCount != null) {
      return res.send({
        message: '회원가입 성공',
      })
    }
  }
}
