import MockResult from '#entity/MockScore'

export default class ResultResponse {
  score: number
  maxScore: number
  topPercentile: number

  static of(mockResult: MockResult): ResultResponse {
    return new ResultResponse(
      mockResult.score,
      mockResult.maxScore,
      mockResult.topPercentile,
    )
  }

  constructor(score: number, maxScore: number, topPercentile: number) {
    this.score = score
    this.maxScore = maxScore
    this.topPercentile = topPercentile
  }
}
