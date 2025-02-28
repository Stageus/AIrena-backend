import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface SendVerifyEmailRequestParams {
  email: string
}

export default class SendVerifyEmailRequest {
  public email: string

  constructor(params: SendVerifyEmailRequestParams) {
    if (!new RegExp(Regex.email).test(params.email)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.email = params.email
  }
}
