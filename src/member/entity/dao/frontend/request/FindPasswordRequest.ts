import ErrorRegistry from '#error/ErrorRegistry'
import Regex from '#util/Regex'
interface FindPasswordRequestParams {
  id: string
  email: string
}

export default class FindPasswordRequest {
  public id: string
  public email: string

  constructor(params: FindPasswordRequestParams) {
    if (!RegExp(Regex.id, params.id) || !RegExp(Regex.email, params.email)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.id = params.id
    this.email = params.email
  }
}
