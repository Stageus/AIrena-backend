import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface SolveRequestParams {
  singleChoiceAnswer: number | null
  textAnswer: string | null
}

export default class SolveRequest {
  singleChoiceAnswer: number | null
  textAnswer: string | null

  constructor(public params: SolveRequestParams) {
    if (
      (typeof params.textAnswer === 'string' &&
        !new RegExp(Regex.TEXT_ANSWER).test(params.textAnswer)) ||
      (typeof params.singleChoiceAnswer === 'number' &&
        (params.singleChoiceAnswer > 3 || params.singleChoiceAnswer < 0))
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }

    this.singleChoiceAnswer = params.singleChoiceAnswer
    this.textAnswer = params.textAnswer
  }
}
