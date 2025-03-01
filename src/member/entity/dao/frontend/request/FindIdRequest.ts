import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'
interface FindIdRequestParams {
  email: string
}

export default class FindIdRequest {
  public email: string

  constructor(params: FindIdRequestParams) {
    if (!new RegExp(Regex.EMAIL).test(params.email as string)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.email = params.email
  }
}
;``
