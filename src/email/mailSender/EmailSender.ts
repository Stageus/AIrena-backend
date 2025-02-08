import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()

export default class EmailSender {
  static sendEmail = (param: nodemailer.SendMailOptions) => {
    const transporter = nodemailer.createTransport({
      service: 'GMail', // 메일 서비스 이름
      port: 587, // 메일 서버 포트 (보안을 위해 TLS를 지원하는 587 포트 사용을 권장한다)
      host: 'smtp.gmail.com', // 메일 서버 도메인 또는 IP
      secure: true, // TLS 사용 여부
      requireTLS: true, // TLS 연결 시도 여부
      auth: {
        user: process.env.CONFIRMEMAIL_SENDER,
        pass: process.env.CONFIRMEMAIL_PASSWORD,
      },
    })
    const mailOption: nodemailer.SendMailOptions = {
      from: process.env.CONFIRMEMAIL_SENDER,
      to: param.to,
      subject: param.subject,
      text: param.text,
      html: param.html,
      attachments: param.attachments,
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
