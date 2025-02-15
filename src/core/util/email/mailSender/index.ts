import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import nodemailer from 'nodemailer'
import path from 'path'
dotenv.config()

export default class EmailSender {
  static sendSignupVerifyEmail = (receiver: string, token: string) => {
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

    let htmlTemplatePath = readFileSync(
      path.resolve(
        process.cwd(),
        'src/core/util/email/templates/confirmSignupMail.html',
      ),
      'utf-8',
    )
    // const imagePath = path.join(
    //   process.cwd(),
    //   'src/core/util/email/images/ai-rena-icon.png',
    // )
    const verifyUrl = `${process.env.FRONTEND_SERVER_URL as string}/signup/verify?token=${token}`
    htmlTemplatePath = htmlTemplatePath.replace('{{verifyUrl}}', verifyUrl)

    const mailOption: nodemailer.SendMailOptions = {
      from: `"AI-rena Team" <process.env.CONFIRM_EMAIL_SENDER>`,
      to: receiver,
      subject: 'AIrena 회원가입 안내',
      html: htmlTemplatePath,
      // attachments: [
      //   {
      //     filename: 'ai-rena-icon.png',
      //     path: imagePath,
      //     cid: 'logoImage',
      //   },
      // ],
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

  static sendFindPasswordVerifyEmail = (receiver: string, token: string) => {
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

    let htmlTemplatePath = readFileSync(
      path.resolve(
        process.cwd(),
        'src/core/util/email/templates/confirmPasswordChangeMail.html',
      ),
      'utf-8',
    )
    const imagePath = path.join(
      process.cwd(),
      'src/core/util/email/images/ai-rena-icon.png',
    )
    const verifyUrl = `${process.env.FRONTEND_SERVER_URL as string}/signup/verify?token=${token}`
    htmlTemplatePath = htmlTemplatePath.replace('{{verifyUrl}}', verifyUrl)

    const mailOption: nodemailer.SendMailOptions = {
      from: `"AI-rena Team" <process.env.CONFIRM_EMAIL_SENDER>`,
      to: receiver,
      subject: 'AIrena 비밀번호 변경 안내',
      html: htmlTemplatePath,
      attachments: [
        {
          filename: 'ai-rena-icon.png',
          path: imagePath,
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
