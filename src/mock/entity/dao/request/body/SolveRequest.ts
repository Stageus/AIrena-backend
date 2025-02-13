interface SolveRequestParams {
  singleChoiceAnswer: number | null
  textAnswer: string | null
}

export default class SolveRequest {
  singleChoiceAnswer: number | null
  textAnswer: string | null

  constructor(public params: SolveRequestParams) {
    this.singleChoiceAnswer = params.singleChoiceAnswer
    this.textAnswer = params.textAnswer
  }
}
