import ErrorRegistry from '#error/ErrorRegistry'

interface SolveRequestParams {
  singleChoiceAnswer?: number
  textAnswer?: string
}

export default class SolveRequest {
  singleChoiceAnswer?: number
  textAnswer?: string

  constructor(params: SolveRequestParams) {
    if (typeof params.singleChoiceAnswer === 'number') {
      if (params.singleChoiceAnswer > 3 || params.singleChoiceAnswer < 0) {
        throw ErrorRegistry.INVALID_INPUT_FORMAT
      }
      this.singleChoiceAnswer = Number(params.singleChoiceAnswer)
    }
    if (typeof params.textAnswer === 'string') {
      if (params.textAnswer.length > 100) {
        throw ErrorRegistry.INVALID_INPUT_FORMAT
      }
      this.textAnswer = params.textAnswer
    }
    if (params.singleChoiceAnswer === null && params.textAnswer === null) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
  }
}
