import { postgres } from '#database/postgres'
import FindPasswordRequest from '#dto/request/FindPasswordRequest'
import SignupRequest from '#dto/request/SignupRequest'
import ErrorRegistry from '#error/errorRegistry'
import MemberRepository from '#repository/MemberRepository'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import EmailSender from '../email/mailSender/EmailSender.js'
dotenv.config()

export default class UserService {
  static async emailSend(signupRequest: SignupRequest) {
    const { id, password, passwordCheck, email } = signupRequest
    if (password != passwordCheck) {
      throw ErrorRegistry.PASSWORD_NOT_EQUAL
    }
    // await MemberRepository.insertMember(id, password, email)
    // redis에 이메일 정보를 저장합니다.
    await MemberRepository.emailInfoSave(email)
    // 토큰을 생성하여 메일로 보냅니다.
    const secretKey: string = process.env.JWT_SIGNATURE_KEY || 'jwt-secret-key'
    const Token = jwt.sign(
      {
        userId: id,
        password: password,
      },
      secretKey,
      {
        issuer: 'gb6105',
        expiresIn: '30m',
      },
    )
    EmailSender.sendEmail(email, Token)
    // const __filename = fileURLToPath(import.meta.url)
    // const __dirname = path.dirname(__filename)
    // const htmlContent = readFileSync(
    //   path.join(__dirname, '../../../src/email/templates/confirmMail.html'),
    //   'utf-8',
    // )
    // const logoImageUrl = path.join(
    //   __dirname,
    //   '../../../src/email/images/ai-rena-icon.png',
    // )

    // EmailSender.sendEmail(
    //   {
    //     to: email,
    //     subject: 'AIrena 회원가입 인증 안내',
    //     html: htmlContent,
    //     attachments: [
    //       {
    //         filename: 'ai-rena-icon.png',
    //         path: logoImageUrl,
    //         cid: 'logoImage',
    //       },
    //     ],
    //   },
    //   token,
    // )
  }

  static async findPassword(findPasswordRequest: FindPasswordRequest) {
    const { id, email } = findPasswordRequest
    await postgres.query(
      'SELECT * FROM test.member WHERE id = $1 AND email = $2',
      [id, email],
    )
  }
}
