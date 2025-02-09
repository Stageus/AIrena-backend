import { postgres } from '#database/postgres'
import FindPasswordRequest from '#dto/request/FindPasswordRequest'
import SignupRequest from '#dto/request/SignupRequest'
import ErrorRegistry from '#error/errorRegistry'
import MemberRepository from '#repository/MemberRepository'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import EmailSender from '../email/mailSender/EmailSender.js'

export default class UserService {
  static async signup(signupRequest: SignupRequest) {
    const { id, password, passwordCheck, email } = signupRequest
    if (password != passwordCheck) {
      throw ErrorRegistry.PASSWORD_NOT_EQUAL
    }
    await MemberRepository.insertMember(id, password, email)
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const htmlContent = readFileSync(
      path.join(__dirname, '../../../src/email/templates/confirmMail.html'),
      'utf-8',
    )
    const logoImageUrl = readFileSync(
      path.join(__dirname, '../../../src/email/images/ai-rena-icon.png'),
      'utf-8',
    )
    EmailSender.sendEmail({
      to: email,
      subject: 'AIrena 회원가입 인증 안내내',
      html: htmlContent,
      attachments: [
        {
          filename: 'ai-rena-icon.png',
          path: path.join(
            __dirname,
            '../../../src/email/images/ai-rena-icon.png',
          ),
          cid: 'logoImage',
        },
      ],
    })
  }

  static async findPassword(findPasswordRequest: FindPasswordRequest) {
    const { id, email } = findPasswordRequest
    await postgres.query(
      'SELECT * FROM test.member WHERE id = $1 AND email = $2',
      [id, email],
    )
  }
}
