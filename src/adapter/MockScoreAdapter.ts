import MockScoreRepository from '#repository/MockScoreRepository'

export default class MockScoreAdapter {
  static async saveScore(memberIdx: number, quizIdx: number) {
    MockScoreRepository.insertScore(memberIdx, quizIdx)
  }
}
