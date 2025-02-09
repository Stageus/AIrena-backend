import QuizInfo from '#domain/QuizInfo'
import dotenv from 'dotenv'
dotenv.config()

const aiServerUrl = process.env.AI_SERVER_URL as string

export default class AIAdapter {
  static async getSingleChoiceQuizzes(quizInfo: QuizInfo): Promise<void> {
    const tokenResponse = await fetch(`${aiServerUrl}/generate/quiz`, {
      method: 'POST',
      body: JSON.stringify({
        title: quizInfo.title,
        content: quizInfo.content,
        subject: quizInfo.subject,
        quizCount: quizInfo,
      }),
    })
  }

  static async getTextQuizzes(quizInfo: QuizInfo): Promise<void> {
    const tokenResponse = await fetch(`${aiServerUrl}/generate/quiz`, {
      method: 'POST',
      body: JSON.stringify({
        title: quizInfo.title,
        content: quizInfo.content,
        subject: quizInfo.subject,
        quizCount: quizInfo,
      }),
    })
  }
}
