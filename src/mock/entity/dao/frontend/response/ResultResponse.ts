export default class ResultResponse {
  score: number
  maxScore: number
  greaterEqualCandidateCount: number
  totalCandidateCount: number

  constructor(
    score: number,
    maxScore: number,
    greaterEqualCandidateCount: number,
    totalCandidateCount: number,
  ) {
    this.score = score
    this.maxScore = maxScore
    this.greaterEqualCandidateCount = greaterEqualCandidateCount
    this.totalCandidateCount = totalCandidateCount
  }
}
