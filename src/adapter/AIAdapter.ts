import SingleChoiceQuizResponseFromAI, {
  SingleChoiceQuiz,
} from '#dto/ai/response/SingleChoiceQuizResponseFromAI'
import TextQuizResponseFromAI, {
  TextQuiz,
} from '#dto/ai/response/TextQuizResponseFromAI'
import Quiz from '#entity/Quiz'
import ErrorRegistry from '#error/ErrorRegistry'
import dotenv from 'dotenv'
import QuizInfo from 'src/entity/QuizInfo.js'
dotenv.config()

export default class AIAdapter {
  static async getSingleChoiceQuizzes(quizInfo: QuizInfo): Promise<Quiz[]> {
    const response = await fetchQuizFromAI('single-choice', quizInfo)

    const quizzesData =
      (await response.json()) as SingleChoiceQuizResponseFromAI

    const quizInstances = quizzesData.quizzes.map(
      (quiz) =>
        new SingleChoiceQuiz(
          quiz.title,
          quiz.description,
          quiz.choices,
          quiz.correctChoice,
          quiz.reason,
        ),
    )

    return quizInstances.map((quiz) => quiz.toQuiz())
  }

  static async getTextQuizzes(quizInfo: QuizInfo): Promise<Quiz[]> {
    const response = await fetchQuizFromAI('text', quizInfo)

    const quizzesData = (await response.json()) as TextQuizResponseFromAI

    const quizInstances = quizzesData.quizzes.map(
      (quiz) =>
        new TextQuiz(
          quiz.title,
          quiz.description,
          quiz.correctAnswer,
          quiz.reason,
        ),
    )
    return quizInstances.map((quiz) => quiz.toQuiz())
  }

  // static async gradeTextAnswer(
  //   submitAnswerS: string[],
  //   correctAnswer: string,
  // ): Promise<number[]> {
  //   const response = await fetch(`${aiServerUrl}/grade/text`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       submitAnswer: submitAnswer,
  //       correctAnswer: correctAnswer,
  //     }),
  //   })

  //   if (!response.ok) {
  //     throw ErrorRegistry.AI_SERVER_CONNECTION_FAILED
  //   }

  //   return response
  // }
}

const aiServerUrl = process.env.AI_SERVER_URL as string

const fetchQuizFromAI = async (
  quizType: 'single-choice' | 'text',
  quizInfo: QuizInfo,
) => {
  const response = await fetch(`${aiServerUrl}/generate/quiz/${quizType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: quizInfo.title,
      description: quizInfo.description,
      subject: quizInfo.subject,
      quizCount: quizInfo.quizCount,
    }),
  })

  if (!response.ok) {
    throw ErrorRegistry.AI_SERVER_CONNECTION_FAILED
  }

  return response
}
