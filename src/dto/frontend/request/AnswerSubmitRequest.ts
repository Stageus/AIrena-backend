interface AnswerSubmitRequestParams {
  singleChoiceAnswer: number | null
  textAnswer: string | null
}

export default class AnswerSubmitRequest {
  singleChoiceAnswer: number | null
  textAnswer: string | null

  constructor(public params: AnswerSubmitRequestParams) {
    this.singleChoiceAnswer = params.singleChoiceAnswer
    this.textAnswer = params.textAnswer
  }
}
