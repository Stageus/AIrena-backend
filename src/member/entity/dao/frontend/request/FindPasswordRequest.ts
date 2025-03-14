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
    if (!params.id) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    if (params.id.length > 16) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.id = params.id

    if (!Regex.EMAIL.test(params.email)) {
      throw ErrorRegistry.INVALID_INPUT_FORMAT
    }
    this.email = params.email
  }
}
