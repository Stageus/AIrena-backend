export default class ResultResponse {
  score: number
  maxScore: number
  topPercentile: number

  constructor(score: number, maxScore: number, topPercentile: number) {
    this.score = score
    this.maxScore = maxScore
    this.topPercentile = topPercentile
  }
}
