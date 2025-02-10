import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'
dotenv.config()

export default class EmailSender {
  static sendEmail = (receiver: string, token: string) => {
    const transporter = nodemailer.createTransport({
      service: 'GMail', // 메일 서비스 이름
      port: 587, // 메일 서버 포트 (보안을 위해 TLS를 지원하는 587 포트 사용을 권장한다)
      host: 'smtp.gmail.com', // 메일 서버 도메인 또는 IP
      secure: true, // TLS 사용 여부
      requireTLS: true, // TLS 연결 시도 여부
      auth: {
        user: process.env.CONFIRM_EMAIL_SENDER,
        pass: process.env.CONFIRM_EMAIL_PASSWORD,
      },
    })
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    let htmlContent = readFileSync(
      path.join(__dirname, '../../../../src/email/templates/confirmMail.html'),
      'utf-8',
    )
    const verifyUrl = `${process.env.FRONTEND_SERVER_URL as string}/signup/verify?token=${token}`
    console.log(verifyUrl)
    htmlContent = htmlContent.replace('{{verifyUrl}}', verifyUrl)

    const logoImageUrl = path.join(
      __dirname,
      '../../../../src/email/images/ai-rena-icon.png',
    )

    const mailOption: nodemailer.SendMailOptions = {
      from: process.env.CONFIRM_EMAIL_SENDER,
      to: receiver,
      subject: 'AIrena 회원가입 인증 안내',
      html: htmlContent,
      attachments: [
        {
          filename: 'ai-rena-icon.png',
          path: logoImageUrl,
          cid: 'logoImage',
        },
      ],
    }

    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.error(err.stack)
        return
      } else
        console.log({
          message: '메일 발송 완료',
        })
    })
  }
}
