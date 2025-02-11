import MockScoreResultFromDB from '#dto/db/MockScoreResultFromDB'

export default class MockResult {
  score: number
  maxScore: number
  topPercentile: number

  constructor(score: number, maxScore: number, topPercentile: number) {
    this.score = score
    this.maxScore = maxScore
    this.topPercentile = topPercentile
  }

  static of(mockScoreResultFromDB: MockScoreResultFromDB): MockResult {
    const topPercentile =
      (mockScoreResultFromDB.greaterEqualCandidateCount /
        mockScoreResultFromDB.totalCandidateCount) *
      100
    return new MockResult(
      mockScoreResultFromDB.score,
      mockScoreResultFromDB.maxScore,
      topPercentile,
    )
  }
}
