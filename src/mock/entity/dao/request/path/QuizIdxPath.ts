interface QuizIdxPathParams {
  idx: number
}

export default class QuizIdxPath {
  public idx: number

  constructor(params: QuizIdxPathParams) {
    this.idx = params.idx
  }
}
