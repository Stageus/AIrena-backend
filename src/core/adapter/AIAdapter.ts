import ErrorRegistry from '#error/ErrorRegistry'
import dotenv from 'dotenv'
dotenv.config()

const aiServerUrl = process.env.AI_SERVER_URL as string

export interface SingleChoiceQuizResponseFromAI {
  quizzes: {
    title: string
    description: string
    choices: string[]
    correctChoice: number
    reason: string
  }[]
}

export interface TextQuizResponseFromAI {
  quizzes: {
    title: string
    description: string
    correctAnswer: string
    reason: string
  }[]
}

export interface TextGradeResponseFromAI {
  scores: number[]
}

export default class AIAdapter {
  static async getSingleChoiceQuizzes(
    title: string,
    description: string,
    subject: string,
    quizCount: number,
  ): Promise<SingleChoiceQuizResponseFromAI> {
    const response = await fetchQuizFromAI(
      'single-choice',
      title,
      description,
      subject,
      quizCount,
    )

    return (await response.json()) as SingleChoiceQuizResponseFromAI
  }

  static async getTextQuizzes(
    title: string,
    description: string,
    subject: string,
    quizCount: number,
  ): Promise<TextQuizResponseFromAI> {
    const response = await fetchQuizFromAI(
      'text',
      title,
      description,
      subject,
      quizCount,
    )

    return (await response.json()) as TextQuizResponseFromAI
  }

  static async gradeTextAnswer(
    submitAnswers: string[],
    correctAnswer: string,
  ): Promise<TextGradeResponseFromAI> {
    const response = await fetch(`${aiServerUrl}/grade/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        submitAnswers: submitAnswers,
        correctAnswer: correctAnswer,
      }),
    })

    if (!response.ok) {
      throw ErrorRegistry.AI_SERVER_CONNECTION_FAILED
    }

    return (await response.json()) as TextGradeResponseFromAI
  }
}

const fetchQuizFromAI = async (
  quizType: 'single-choice' | 'text',
  title: string,
  description: string,
  subject: string,
  quizCount: number,
) => {
  const response = await fetch(`${aiServerUrl}/generate/quiz/${quizType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      description: description,
      subject: subject,
      quizCount: quizCount,
    }),
  })

  if (!response.ok) {
    throw ErrorRegistry.AI_SERVER_CONNECTION_FAILED
  }

  return response
}
