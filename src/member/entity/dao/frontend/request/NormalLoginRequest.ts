import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'

interface NormalLoginRequestParams {
  id: string
  password: string
}

export default class NormalLoginRequest {
  public id: string
  public password: string
  constructor(params: NormalLoginRequestParams) {
    if (
      !new RegExp(Regex.id).test(params.id) ||
      !new RegExp(Regex.password).test(params.id)
    ) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.id = params.id
    this.password = params.password
  }
}
