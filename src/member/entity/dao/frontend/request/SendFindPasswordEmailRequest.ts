import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface SendFindPasswordEmailRequestParams {
  id: string
  email: string
}

export default class SendFindPasswordEmailRequest {
  public id: string
  public email: string

  constructor(params: SendFindPasswordEmailRequestParams) {
    if (
      !new RegExp(Regex.ID).test(params.id) ||
      !new RegExp(Regex.EMAIL).test(params.email)
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.id = params.id
    this.email = params.email
  }
}
