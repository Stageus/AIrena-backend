import MockResult from '#entity/MockScore'

export default class MockResultResponse {
  score: number
  maxScore: number
  topPercentile: number

  constructor(score: number, maxScore: number, topPercentile: number) {
    this.score = score
    this.maxScore = maxScore
    this.topPercentile = topPercentile
  }

  static of(mockResult: MockResult): MockResultResponse {
    return new MockResultResponse(
      mockResult.score,
      mockResult.maxScore,
      mockResult.topPercentile,
    )
  }
}
