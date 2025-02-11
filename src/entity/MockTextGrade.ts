import TextGradeResponseFromAI from '#dto/ai/response/TextGradeResponseFromAI'

export default class MockTextGrade {
  score: number

  constructor(score: number) {
    this.score = score
  }

  static of(textGradeResponseFromAI: TextGradeResponseFromAI): MockTextGrade {
    return new MockTextGrade(textGradeResponseFromAI.scores[0])
  }
}
