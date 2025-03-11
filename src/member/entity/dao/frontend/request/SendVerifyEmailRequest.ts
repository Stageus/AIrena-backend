import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface SendVerifyEmailRequestParams {
  email: string
}

export default class SendVerifyEmailRequest {
  public email: string

  constructor(params: SendVerifyEmailRequestParams) {
    if (!Regex.EMAIL.test(params.email)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.email = params.email
  }
}
